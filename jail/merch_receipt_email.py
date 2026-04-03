"""
Send a plain-text receipt when a guest merch order is paid (webhook).
"""
from __future__ import annotations

import logging
from decimal import Decimal
from typing import Any

from django.conf import settings
from django.core.mail import send_mail
from django.db import transaction
from django.utils import timezone

from .models import MerchCheckoutOrder

logger = logging.getLogger(__name__)


def _format_php_centavos(centavos: int) -> str:
    pesos = (Decimal(centavos) / Decimal(100)).quantize(Decimal("0.01"))
    return f"PHP {pesos:,.2f}"


def _lines_text(lines_json: list[Any]) -> str:
    rows: list[str] = []
    for raw in lines_json:
        if not isinstance(raw, dict):
            continue
        name = str(raw.get("name") or "Item")
        qty = int(raw.get("quantity") or 1)
        qty = max(1, min(qty, 1_000_000_000))
        unit = raw.get("unitAmountPhp")
        try:
            unit_f = float(unit) if unit is not None else 0.0
        except (TypeError, ValueError):
            unit_f = 0.0
        unit_centavos = int(round(unit_f * 100))
        line_centavos = unit_centavos * qty
        rows.append(f"  - {name} × {qty}  {_format_php_centavos(line_centavos)}")
    return "\n".join(rows) if rows else "  (no line details)"


def send_merch_receipt_for_order(order: MerchCheckoutOrder) -> bool:
    """
    Send receipt to buyer_email. Returns True if sent (or nothing to do).
    Sets receipt_email_sent_at on success to avoid duplicates (including concurrent webhooks).
    """
    with transaction.atomic():
        try:
            row = MerchCheckoutOrder.objects.select_for_update().get(pk=order.pk)
        except MerchCheckoutOrder.DoesNotExist:
            return False

        to = (row.buyer_email or "").strip()
        if not to:
            logger.warning(
                "Merch order %s paid but buyer_email is empty — no receipt",
                row.reference_number,
            )
            return True

        if row.receipt_email_sent_at:
            return True

        ship = row.shipping_snapshot if isinstance(row.shipping_snapshot, dict) else {}
        name = str(ship.get("fullName") or "Customer")

        subject = f"Receipt — Tech Savvy order {row.reference_number}"
        body = (
            f"Hi {name},\n\n"
            f"Thank you for your purchase. This email confirms payment for your merchandise order.\n\n"
            f"Order reference: {row.reference_number}\n"
            f"Date (UTC): {row.updated_at.isoformat() if row.updated_at else ''}\n"
            f"Total: {_format_php_centavos(row.total_centavos)}\n\n"
            f"Items:\n{_lines_text(row.lines_json if isinstance(row.lines_json, list) else [])}\n\n"
            f"If you have questions, reply to this email or contact us through our website.\n\n"
            f"— Tech Savvy\n"
        )

        from_email = getattr(settings, "DEFAULT_FROM_EMAIL", None) or "noreply@localhost"
        try:
            send_mail(
                subject,
                body,
                from_email,
                [to],
                fail_silently=False,
            )
        except Exception:
            logger.exception("Failed to send merch receipt for order %s", row.reference_number)
            return False

        now = timezone.now()
        MerchCheckoutOrder.objects.filter(pk=row.pk).update(receipt_email_sent_at=now)
        logger.info("Merch receipt emailed for order %s", row.reference_number)
        return True
