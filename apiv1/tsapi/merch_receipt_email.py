"""
Merchandise order receipt email after PayMongo marks an order paid (webhook).

Body is rendered from `templates/emails/merch_receipt.html`, not inline Python strings.
"""
from __future__ import annotations

import logging
from decimal import Decimal
from typing import Any

from django.conf import settings
from django.core.mail import send_mail
from django.db import transaction
from django.template.loader import render_to_string
from django.utils import timezone
from django.utils.html import strip_tags

from .models import MerchCheckoutOrder

logger = logging.getLogger(__name__)


def _format_php_from_centavos(centavos: int) -> str:
    """Display amount in PHP from integer centavos (PayMongo-style)."""
    pesos = (Decimal(centavos) / Decimal(100)).quantize(Decimal("0.01"))
    return f"PHP {pesos:,.2f}"


def _line_rows_for_template(lines_json: list[Any]) -> list[dict[str, str]]:
    """Build template context rows: name × qty and formatted line total."""
    rows: list[dict[str, str]] = []
    for raw in lines_json:
        if not isinstance(raw, dict):
            continue
        name = str(raw.get("name") or "Item")
        quantity = int(raw.get("quantity") or 1)
        quantity = max(1, min(quantity, 1_000_000_000))
        unit_raw = raw.get("unitAmountPhp")
        try:
            unit_float = float(unit_raw) if unit_raw is not None else 0.0
        except (TypeError, ValueError):
            unit_float = 0.0
        unit_centavos = int(round(unit_float * 100))
        line_centavos = unit_centavos * quantity
        rows.append(
            {
                "label": f"{name} × {quantity}",
                "amount_display": _format_php_from_centavos(line_centavos),
            }
        )
    return rows


def send_merch_receipt_for_order(order: MerchCheckoutOrder) -> bool:
    """
    Email the buyer if `buyer_email` is set. Idempotent via `receipt_email_sent_at`.

    Returns True when there is nothing to send or send succeeded; False on mail failure.
    """
    with transaction.atomic():
        try:
            locked_order = MerchCheckoutOrder.objects.select_for_update().get(pk=order.pk)
        except MerchCheckoutOrder.DoesNotExist:
            return False

        recipient_email = (locked_order.buyer_email or "").strip()
        if not recipient_email:
            logger.warning(
                "Merch order %s paid but buyer_email is empty — no receipt",
                locked_order.reference_number,
            )
            return True

        if locked_order.receipt_email_sent_at:
            return True

        shipping = (
            locked_order.shipping_snapshot
            if isinstance(locked_order.shipping_snapshot, dict)
            else {}
        )
        buyer_display_name = str(shipping.get("fullName") or "Customer")
        lines = (
            locked_order.lines_json if isinstance(locked_order.lines_json, list) else []
        )

        template_context = {
            "buyer_name": buyer_display_name,
            "order_reference": locked_order.reference_number,
            "date_utc": (
                locked_order.updated_at.isoformat() if locked_order.updated_at else ""
            ),
            "total_display": _format_php_from_centavos(locked_order.total_centavos),
            "line_rows": _line_rows_for_template(lines),
        }

        html_message = render_to_string("emails/merch_receipt.html", template_context)
        plain_message = strip_tags(html_message)
        subject = f"Receipt — Tech Savvy order {locked_order.reference_number}"
        from_email = getattr(settings, "DEFAULT_FROM_EMAIL", None) or "noreply@localhost"

        try:
            send_mail(
                subject,
                plain_message,
                from_email,
                [recipient_email],
                fail_silently=False,
                html_message=html_message,
            )
        except Exception:
            logger.exception(
                "Failed to send merch receipt for order %s",
                locked_order.reference_number,
            )
            return False

        sent_at = timezone.now()
        MerchCheckoutOrder.objects.filter(pk=locked_order.pk).update(
            receipt_email_sent_at=sent_at
        )
        logger.info("Merch receipt emailed for order %s", locked_order.reference_number)
        return True
