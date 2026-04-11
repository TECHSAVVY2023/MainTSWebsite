import logging

from django.core.mail import send_mail
from django.utils import timezone
from django.db import transaction, IntegrityError
from django.conf import settings
from django.http import JsonResponse
from django.core.validators import EmailValidator
from django.core.exceptions import ValidationError

from tsapi.models import MerchCheckoutOrder, PaymongoWebhookEvent

logger = logging.getLogger(__name__)
from .utils import format_php_centavos, lines_to_text, build_paymongo_address
from .paymongo_client import create_checkout_session, PayMongoApiError

import uuid
import hashlib, hmac, json

validator = EmailValidator()


def _payment_method_types_list() -> list[str]:
    raw = getattr(settings, "PAYMONGO_PAYMENT_METHOD_TYPES", "") or "card,gcash,paymaya,qrph"
    return [x.strip() for x in raw.split(",") if x.strip()]


class ReceiptService:
    """
    Email a plain-text receipt to `buyer_email` after PayMongo marks the order paid.

    Idempotent via `receipt_email_sent_at` — only set **after** `send_mail` succeeds
    so SMTP failures can be retried on a duplicate webhook.
    """

    @staticmethod
    def send(order: MerchCheckoutOrder) -> bool:
        try:
            with transaction.atomic():
                row = MerchCheckoutOrder.objects.select_for_update().get(pk=order.pk)
                if row.receipt_email_sent_at:
                    return True

                to = (row.buyer_email or "").strip()
                if not to:
                    logger.warning(
                        "Merch order %s: paid but buyer_email is empty — no receipt",
                        row.reference_number,
                    )
                    return True

                ship = row.shipping_snapshot or {}
                name = ship.get("fullName", "Customer")

                body = (
                    f"Hi {name},\n\n"
                    "Thank you for your Tech Savvy merchandise order.\n\n"
                    f"Order: {row.reference_number}\n"
                    f"Total: {format_php_centavos(row.total_centavos)}\n\n"
                    f"{lines_to_text(row.lines_json or [])}\n"
                )

                send_mail(
                    f"Receipt — {row.reference_number}",
                    body,
                    settings.DEFAULT_FROM_EMAIL,
                    [to],
                    fail_silently=False,
                )
                row.receipt_email_sent_at = timezone.now()
                row.save(update_fields=["receipt_email_sent_at"])
        except MerchCheckoutOrder.DoesNotExist:
            return False
        except Exception:
            logger.exception(
                "Merch receipt email failed for order %s",
                getattr(order, "reference_number", order.pk),
            )
            return False

        return True

class CheckoutService:

    @staticmethod
    def create(body: dict):
        email = body.get("shipping", {}).get("email", "")
        confirm = body.get("confirm_email", "")

        if email.casefold() != confirm.casefold():
            return JsonResponse({"error": "Email mismatch"}, status=400)

        try:
            validator(email)
        except ValidationError:
            return JsonResponse({"error": "Invalid email"}, status=400)

        lines = body.get("lines", [])
        if not lines:
            return JsonResponse({"error": "No items provided"}, status=400)

        ref = body.get("reference_number") or uuid.uuid4().hex

        line_items = []
        total = 0
        checkout_desc = str(getattr(settings, "MERCH_CHECKOUT_DESCRIPTION", "") or "").strip() or "Tech Savvy merchandise"
        checkout_desc = checkout_desc[:255]
        ship = body.get("shipping") or {}

        for item in lines:
            unit_php = float(item.get("unitAmountPhp") or 0)
            amount = int(round(unit_php * 100))
            qty = int(item.get("quantity") or 1)

            li = {
                "currency": "PHP",
                "amount": amount,
                "name": item.get("name") or "Item",
                "quantity": qty,
                "description": checkout_desc[:255],
            }
            img = item.get("image")
            if isinstance(img, str) and img.startswith("https://"):
                li["images"] = [img]
            line_items.append(li)

            total += amount * qty

        order = MerchCheckoutOrder.objects.create(
            reference_number=ref,
            buyer_email=email,
            status=MerchCheckoutOrder.STATUS_PENDING,
            total_centavos=total,
            lines_json=lines,
            shipping_snapshot=ship,
        )

        send_email_receipt = body.get("send_email_receipt")
        if send_email_receipt is None:
            send_email_receipt = True
        else:
            send_email_receipt = bool(send_email_receipt)

        addr = build_paymongo_address(ship)
        billing = {
            "name": str(ship.get("fullName") or "Customer")[:255],
            "email": email,
            "phone": str(ship.get("phone") or "")[:50],
            "address": {
                **addr,
                "state": str(ship.get("province") or "")[:100],
            },
        }

        payload = {
            "data": {
                "attributes": {
                    "reference_number": ref,
                    "description": checkout_desc,
                    "line_items": line_items,
                    "payment_method_types": _payment_method_types_list(),
                    "billing": billing,
                    "send_email_receipt": send_email_receipt,
                    "success_url": body.get("success_url") or "http://localhost:3000/success",
                    "cancel_url": body.get("cancel_url") or "http://localhost:3000/cancel",
                    "metadata": {"order_ref": ref},
                }
            }
        }

        try:
            res = create_checkout_session(payload)
        except PayMongoApiError as e:
            order.delete()
            return JsonResponse({"error": getattr(e, "body", str(e))}, status=400)

        order.checkout_session_id = res["data"]["id"]
        order.save(update_fields=["checkout_session_id"])

        return JsonResponse({
            "checkout_url": res["data"]["attributes"]["checkout_url"],
            "reference_number": ref
        })
        
class WebhookService:

    @staticmethod
    def verify(raw: bytes, sig: str) -> bool:
        secret = settings.PAYMONGO_WEBHOOK_SECRET
        if not sig:
            return False

        timestamp, test, live = [p.split("=")[1] for p in sig.split(",")]
        expected = hmac.new(
            secret.encode(),
            f"{timestamp}.{raw.decode()}".encode(),
            hashlib.sha256,
        ).hexdigest()

        return hmac.compare_digest(expected, live or test)

    @staticmethod
    def handle(raw: bytes):
        data = json.loads(raw.decode())
        event = data.get("data", {})
        attrs = event.get("attributes", {})
        event_type = attrs.get("type")

        logger.info("PayMongo webhook: %s", event_type)

        try:
            with transaction.atomic():
                PaymongoWebhookEvent.objects.create(
                    paymongo_event_id=event.get("id"),
                    event_type=event_type,
                    payload=data,
                )
        except IntegrityError:
            return JsonResponse({"duplicate": True})

        if event_type == "checkout_session.payment.paid":

            data_obj = attrs.get("data", {})

            cs_id = (
                data_obj.get("id")
                or data_obj.get("attributes", {}).get("id")
            )

            order = None

            if cs_id:
                order = MerchCheckoutOrder.objects.filter(
                    checkout_session_id=cs_id
                ).first()

            if order and order.status == MerchCheckoutOrder.STATUS_PENDING:
                order.status = MerchCheckoutOrder.STATUS_PAID
                order.save(update_fields=["status"])
                if getattr(settings, "MERCH_SEND_CUSTOM_RECEIPT_EMAIL", False):
                    try:
                        ReceiptService.send(order)
                    except Exception:
                        logger.exception(
                            "Custom receipt email failed for order %s",
                            order.reference_number,
                        )

        elif event_type == "payment.paid":

            data_obj = attrs.get("data", {})
            pay_attrs = data_obj.get("attributes", {})

            metadata = pay_attrs.get("metadata", {}) or {}
            ref = metadata.get("order_ref")

            order = None

            if ref:
                order = MerchCheckoutOrder.objects.filter(
                    reference_number=ref
                ).first()

            if order and order.status == MerchCheckoutOrder.STATUS_PENDING:
                order.status = MerchCheckoutOrder.STATUS_PAID
                order.save(update_fields=["status"])
                if getattr(settings, "MERCH_SEND_CUSTOM_RECEIPT_EMAIL", False):
                    try:
                        ReceiptService.send(order)
                    except Exception:
                        logger.exception(
                            "Custom receipt email failed for order %s",
                            order.reference_number,
                        )

        return JsonResponse({"received": True})


class OrderService:

    @staticmethod
    def get(reference: str):
        ref = (reference or "").strip()
        if not ref:
            return JsonResponse({"error": "missing reference"}, status=400)

        order = MerchCheckoutOrder.objects.filter(
            reference_number=ref
        ).first()

        if not order:
            return JsonResponse({"error": "not found"}, status=404)

        return JsonResponse({
            "reference_number": order.reference_number,
            "status": order.status,
            "checkout_session_id": order.checkout_session_id,
            "total_centavos": order.total_centavos,
        })