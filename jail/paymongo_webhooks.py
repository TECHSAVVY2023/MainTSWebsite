"""
PayMongo webhooks — signature verification matches paymongo-node Webhook.constructEvent:
  HMAC-SHA256( webhook_secret, f"{timestamp}.{raw_payload}" ) as hex,
  compared to the test (te) or live (li) segment in the Paymongo-Signature header.

Dashboard URL (with ngrok): https://YOUR_HOST/webhooks/paymongo/
Set PAYMONGO_WEBHOOK_SECRET in the environment to the webhook signing secret (whsk_...).
"""
from __future__ import annotations

import hashlib
import hmac
import json
import logging
from typing import Any

from django.db import IntegrityError, transaction
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from . import payment_config
from .merch_receipt_email import send_merch_receipt_for_order
from .models import MerchCheckoutOrder, PaymongoWebhookEvent

logger = logging.getLogger(__name__)


def verify_paymongo_signature(*, raw_body: bytes, signature_header: str, webhook_secret: str) -> bool:
    """
    Verify Paymongo-Signature header (same rules as paymongo-node src/services/Webhook.js).
    raw_body must be the exact request body bytes.
    """
    if not webhook_secret or not signature_header:
        return False
    parts = [p.strip() for p in signature_header.split(",")]
    if len(parts) < 3:
        return False
    try:
        timestamp = parts[0].split("=", 1)[1]
        test_sig = parts[1].split("=", 1)[1]
        live_sig = parts[2].split("=", 1)[1]
    except (IndexError, ValueError):
        return False
    comparison = live_sig if live_sig else test_sig
    if not comparison:
        return False
    payload_str = raw_body.decode("utf-8")
    signed = f"{timestamp}.{payload_str}".encode("utf-8")
    expected = hmac.new(
        webhook_secret.encode("utf-8"),
        signed,
        hashlib.sha256,
    ).hexdigest()
    return hmac.compare_digest(expected, comparison)


def _parse_event(body: bytes) -> tuple[str, str, bool, dict[str, Any]]:
    data = json.loads(body.decode("utf-8"))
    root = data.get("data") or {}
    event_id = str(root.get("id") or "").strip()
    attrs = root.get("attributes") or {}
    event_type = str(attrs.get("type") or "").strip()
    livemode = bool(attrs.get("livemode"))
    return event_id, event_type, livemode, data


def _checkout_session_id_from_event(attrs: dict[str, Any]) -> str:
    inner = attrs.get("data")
    if isinstance(inner, dict):
        return str(inner.get("id") or "").strip()
    return ""


def _mark_pending_paid_by_checkout_session(checkout_session_id: str) -> None:
    """Transition pending order to paid by PayMongo checkout session id; then email receipt."""
    if not checkout_session_id:
        return
    updated_rows = MerchCheckoutOrder.objects.filter(
        checkout_session_id=checkout_session_id,
        status=MerchCheckoutOrder.STATUS_PENDING,
    ).update(status=MerchCheckoutOrder.STATUS_PAID)
    if not updated_rows:
        logger.info(
            "checkout_session.payment.paid: no pending order for session %s",
            checkout_session_id,
        )
        return
    logger.info("Merch order marked paid (checkout session %s)", checkout_session_id)
    try:
        paid_order = MerchCheckoutOrder.objects.get(
            checkout_session_id=checkout_session_id
        )
        send_merch_receipt_for_order(paid_order)
    except MerchCheckoutOrder.DoesNotExist:
        pass


def _mark_pending_paid_by_reference(reference_number: str) -> None:
    """Transition pending order to paid by our `reference_number` (metadata.order_ref); then email."""
    if not reference_number:
        return
    updated_rows = MerchCheckoutOrder.objects.filter(
        reference_number=reference_number,
        status=MerchCheckoutOrder.STATUS_PENDING,
    ).update(status=MerchCheckoutOrder.STATUS_PAID)
    if not updated_rows:
        return
    try:
        paid_order = MerchCheckoutOrder.objects.get(reference_number=reference_number)
        send_merch_receipt_for_order(paid_order)
    except MerchCheckoutOrder.DoesNotExist:
        pass


def _handle_event_type(event_type: str, payload: dict[str, Any]) -> None:
    """Mark `MerchCheckoutOrder` paid from PayMongo events; log other types."""
    root = payload.get("data") or {}
    attrs = root.get("attributes") or {}
    if not isinstance(attrs, dict):
        attrs = {}

    if event_type == "checkout_session.payment.paid":
        session_id = _checkout_session_id_from_event(attrs)
        if session_id:
            _mark_pending_paid_by_checkout_session(session_id)
        else:
            logger.warning(
                "checkout_session.payment.paid: missing checkout session id in payload"
            )
    elif event_type == "payment.paid":
        inner = attrs.get("data")
        if isinstance(inner, dict):
            pay_attrs = inner.get("attributes") or {}
            if isinstance(pay_attrs, dict):
                meta = pay_attrs.get("metadata") or {}
                if isinstance(meta, dict):
                    order_ref = str(meta.get("order_ref") or "").strip()
                    if order_ref:
                        _mark_pending_paid_by_reference(order_ref)
        logger.info("PayMongo payment.paid processed")
    elif event_type == "payment.failed":
        logger.warning("PayMongo payment.failed")
    elif event_type == "qrph.expired":
        logger.info("PayMongo qrph.expired")
    else:
        logger.info("PayMongo event (unhandled type): %s", event_type)


@csrf_exempt
@require_POST
def paymongo_webhook(request):
    raw = request.body
    secret = payment_config.PAYMONGO_WEBHOOK_SECRET

    # Paymongo-Signature -> HTTP_PAYMONGO_SIGNATURE in Django META
    sig = request.META.get("HTTP_PAYMONGO_SIGNATURE", "")
    if not sig and hasattr(request, "headers"):
        sig = request.headers.get("Paymongo-Signature") or ""

    if not secret:
        logger.error(
            "PAYMONGO_WEBHOOK_SECRET is not set — refusing webhook (configure env and restart)."
        )
        return HttpResponse("Webhook secret not configured", status=503)

    if not verify_paymongo_signature(
        raw_body=raw, signature_header=sig, webhook_secret=secret
    ):
        logger.warning("PayMongo webhook signature verification failed")
        return HttpResponse("Invalid signature", status=403)

    try:
        event_id, event_type, livemode, payload = _parse_event(raw)
    except (json.JSONDecodeError, UnicodeDecodeError) as e:
        logger.warning("PayMongo webhook invalid JSON: %s", e)
        return HttpResponseBadRequest("Invalid JSON")

    if not event_id:
        logger.warning("PayMongo webhook missing data.id")
        return HttpResponseBadRequest("Missing event id")

    try:
        with transaction.atomic():
            PaymongoWebhookEvent.objects.create(
                paymongo_event_id=event_id,
                event_type=event_type or "unknown",
                livemode=livemode,
                payload=payload,
            )
    except IntegrityError:
        logger.info("PayMongo duplicate event %s — acknowledging", event_id)
        return JsonResponse({"received": True, "duplicate": True})

    try:
        _handle_event_type(event_type, payload)
    except Exception:
        logger.exception("PayMongo handler error for %s", event_id)

    return JsonResponse({"received": True})


def paymongo_webhook_health(_request):
    """GET for tunnel checks; does not expose webhook signing secret."""
    base = payment_config.PAYMONGO_PUBLIC_BASE_URL.strip().rstrip("/")
    data: dict = {
        "service": "paymongo-webhook",
        "post_path": "/webhooks/paymongo/",
        "configured": bool(payment_config.PAYMONGO_WEBHOOK_SECRET),
    }
    if base:
        data["endpoint_url_for_paymongo_dashboard"] = f"{base}/webhooks/paymongo/"
        data["instructions"] = (
            "Copy endpoint_url_for_paymongo_dashboard into PayMongo → Webhooks → your webhook → "
            "Edit → Endpoint URL → Save. (We cannot change PayMongo for you; this value is built from PAYMONGO_PUBLIC_BASE_URL.)"
        )
    else:
        data["hint"] = (
            "Set PAYMONGO_PUBLIC_BASE_URL in apiv1/.env to your HTTPS tunnel host only "
            "(e.g. https://xxxx.ngrok-free.dev) to see the full URL to paste in PayMongo."
        )
    return JsonResponse(data)
