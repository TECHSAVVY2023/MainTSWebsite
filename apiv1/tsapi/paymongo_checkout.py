"""
PayMongo checkout session creation and order status (server-side only).

Secrets and tunables come from `payment_config` / API `.env`, not the frontend.
"""
from __future__ import annotations

import base64
import json
import logging
import uuid
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from django.core.exceptions import ValidationError
from django.core.validators import EmailValidator
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from . import payment_config
from .models import MerchCheckoutOrder

_email_validator = EmailValidator()

logger = logging.getLogger(__name__)


def _paymongo_auth_header() -> str:
    key = payment_config.PAYMONGO_SECRET_KEY or ""
    token = base64.b64encode(f"{key}:".encode("utf-8")).decode("ascii")
    return f"Basic {token}"


def _paymongo_post(payload: dict[str, Any]) -> dict[str, Any]:
    body = json.dumps(payload).encode("utf-8")
    req = Request(
        payment_config.PAYMONGO_CHECKOUT_SESSIONS_URL,
        data=body,
        headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": _paymongo_auth_header(),
        },
        method="POST",
    )
    try:
        with urlopen(req, timeout=60) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except HTTPError as e:
        err_body = e.read().decode("utf-8", errors="replace")
        try:
            parsed = json.loads(err_body)
        except json.JSONDecodeError:
            parsed = {"raw": err_body}
        logger.warning("PayMongo API HTTP %s: %s", e.code, err_body[:500])
        raise PayMongoApiError(e.code, parsed) from e
    except URLError as e:
        logger.exception("PayMongo API network error")
        raise PayMongoApiError(0, {"message": str(e.reason)}) from e


class PayMongoApiError(Exception):
    def __init__(self, status: int, body: dict[str, Any]) -> None:
        super().__init__(str(body))
        self.status = status
        self.body = body


def _payment_method_types() -> list[str]:
    raw = payment_config.PAYMONGO_PAYMENT_METHOD_TYPES
    return [part.strip() for part in raw.split(",") if part.strip()]


@csrf_exempt
@require_http_methods(["POST"])
def paymongo_create_checkout(request):
    if not payment_config.PAYMONGO_SECRET_KEY:
        return JsonResponse(
            {"error": "PAYMONGO_SECRET_KEY is not configured on the server."},
            status=503,
        )

    try:
        body = json.loads(request.body.decode("utf-8"))
    except (json.JSONDecodeError, UnicodeDecodeError):
        return JsonResponse({"error": "Invalid JSON body"}, status=400)

    lines = body.get("lines")
    success_url = (body.get("success_url") or "").strip()
    cancel_url = (body.get("cancel_url") or "").strip()
    shipping_raw = body.get("shipping") if isinstance(body.get("shipping"), dict) else {}
    shipping = dict(shipping_raw)
    shipping.pop("confirmEmail", None)
    confirm_raw = (
        (body.get("confirm_email") or shipping_raw.get("confirmEmail") or "").strip()
    )
    email_raw = (shipping_raw.get("email") or "").strip()
    reference = (body.get("reference_number") or "").strip()

    if not email_raw or not confirm_raw:
        return JsonResponse(
            {
                "error": "email and confirm_email are required for checkout (guest purchases).",
            },
            status=400,
        )
    if email_raw.casefold() != confirm_raw.casefold():
        return JsonResponse(
            {"error": "Email and confirmation do not match."},
            status=400,
        )
    try:
        _email_validator(email_raw)
    except ValidationError:
        return JsonResponse({"error": "Invalid email address."}, status=400)

    shipping["email"] = email_raw

    if not isinstance(lines, list) or len(lines) == 0:
        return JsonResponse({"error": "lines must be a non-empty array"}, status=400)
    if not success_url or not cancel_url:
        return JsonResponse(
            {"error": "success_url and cancel_url are required (absolute URLs)."},
            status=400,
        )

    if not reference:
        reference = uuid.uuid4().hex
    if len(reference) > 64:
        return JsonResponse({"error": "reference_number too long"}, status=400)

    if MerchCheckoutOrder.objects.filter(reference_number=reference).exists():
        return JsonResponse(
            {"error": "reference_number already used; generate a new id."},
            status=409,
        )

    line_items: list[dict[str, Any]] = []
    total_centavos = 0
    for raw_line in lines:
        if not isinstance(raw_line, dict):
            continue
        name = str(raw_line.get("name") or "Item")[:200]
        qty = int(raw_line.get("quantity") or 1)
        qty = max(1, min(qty, 1_000_000_000))
        unit_php = float(raw_line.get("unitAmountPhp") or 0)
        unit_centavos = int(round(unit_php * 100))
        if unit_centavos < 100:
            unit_centavos = 100
        line_total = unit_centavos * qty
        total_centavos += line_total
        item: dict[str, Any] = {
            "amount": unit_centavos,
            "currency": "PHP",
            "name": name,
            "quantity": qty,
            "description": name[:255],
        }
        img = raw_line.get("image")
        if isinstance(img, str) and img.startswith("https://"):
            item["images"] = [img[:2048]]
        line_items.append(item)

    if not line_items:
        return JsonResponse({"error": "No valid line items"}, status=400)

    order = MerchCheckoutOrder.objects.create(
        reference_number=reference,
        status=MerchCheckoutOrder.STATUS_PENDING,
        buyer_email=email_raw,
        lines_json=lines,
        shipping_snapshot=shipping,
        total_centavos=total_centavos,
    )

    attrs: dict[str, Any] = {
        "line_items": line_items,
        "payment_method_types": _payment_method_types(),
        "success_url": success_url,
        "cancel_url": cancel_url,
        "reference_number": reference[:255],
        "description": "Tech Savvy merchandise",
        "send_email_receipt": bool(body.get("send_email_receipt")),
        "show_line_items": True,
        "metadata": {"order_ref": reference[:255]},
    }

    email = (shipping.get("email") or email_raw or "").strip()
    if email:
        addr = _paymongo_address_from_shipping(shipping)
        attrs["billing"] = {
            "name": str(shipping.get("fullName") or "")[:255],
            "email": email[:255],
            "phone": str(shipping.get("phone") or "")[:50],
            "address": addr,
        }

    payload = {"data": {"attributes": attrs}}

    try:
        res = _paymongo_post(payload)
    except PayMongoApiError as e:
        order.delete()
        return JsonResponse(
            {"error": "PayMongo rejected checkout session", "details": e.body},
            status=502 if e.status >= 500 or e.status == 0 else 400,
        )
    except Exception:
        logger.exception("Unexpected error creating PayMongo session")
        order.delete()
        return JsonResponse({"error": "Could not reach PayMongo"}, status=502)

    try:
        data = res.get("data") or {}
        cs_id = str(data.get("id") or "")
        cs_attrs = data.get("attributes") or {}
        checkout_url = str(cs_attrs.get("checkout_url") or "")
    except (TypeError, AttributeError):
        cs_id, checkout_url = "", ""

    if not checkout_url or not cs_id:
        order.delete()
        return JsonResponse(
            {"error": "Unexpected PayMongo response", "raw": res},
            status=502,
        )

    order.checkout_session_id = cs_id
    order.save(update_fields=["checkout_session_id", "updated_at"])

    return JsonResponse(
        {
            "checkout_url": checkout_url,
            "reference_number": reference,
            "checkout_session_id": cs_id,
        }
    )


def _country_code(raw: Any) -> str:
    s = str(raw or "").strip().upper()
    if len(s) == 2 and s.isalpha():
        return s
    return "PH"


def _paymongo_address_from_shipping(shipping: dict[str, Any]) -> dict[str, str]:
    """Build PayMongo billing.address from PH-style fields or legacy line1/line2/city."""
    street = str(shipping.get("street") or "").strip()
    barangay = str(shipping.get("barangay") or "").strip()
    city = str(shipping.get("city") or "").strip()
    province = str(shipping.get("province") or "").strip()
    region = str(shipping.get("region") or "").strip()
    line1_legacy = str(shipping.get("line1") or "").strip()

    if street or barangay or province or region:
        if street:
            line1 = street[:255]
        elif barangay:
            line1 = f"Brgy. {barangay}"[:255]
        else:
            line1 = (city or province or ".")[:255]
        line2_parts: list[str] = []
        if street and barangay:
            line2_parts.append(f"Brgy. {barangay}")
        if province:
            line2_parts.append(province)
        if region:
            line2_parts.append(region)
        line2 = ", ".join(line2_parts)[:255]
        addr: dict[str, str] = {
            "line1": line1 or ".",
            "city": (city or province or "PH")[:100],
            "country": "PH",
        }
        if line2:
            addr["line2"] = line2
        return addr

    addr_legacy: dict[str, str] = {
        "line1": (line1_legacy or ".")[:255],
        "city": (city or ".")[:100],
        "country": _country_code(shipping.get("country")),
    }
    line2 = str(shipping.get("line2") or "").strip()
    if line2:
        addr_legacy["line2"] = line2[:255]
    postal = str(shipping.get("postal") or "").strip()
    if postal:
        addr_legacy["postal_code"] = postal[:32]
    return addr_legacy


@require_http_methods(["GET"])
def paymongo_order_status(request, reference: str):
    ref = reference.strip()
    if not ref:
        return JsonResponse({"error": "missing reference"}, status=400)
    try:
        order = MerchCheckoutOrder.objects.get(reference_number=ref)
    except MerchCheckoutOrder.DoesNotExist:
        return JsonResponse({"error": "not found"}, status=404)
    return JsonResponse(
        {
            "reference_number": order.reference_number,
            "status": order.status,
            "checkout_session_id": order.checkout_session_id,
            "total_centavos": order.total_centavos,
        }
    )
