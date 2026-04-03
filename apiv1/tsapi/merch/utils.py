from decimal import Decimal
from typing import Any


def format_php_centavos(centavos: int) -> str:
    pesos = (Decimal(centavos) / Decimal(100)).quantize(Decimal("0.01"))
    return f"PHP {pesos:,.2f}"


def lines_to_text(lines_json: list[Any]) -> str:
    rows: list[str] = []
    for raw in lines_json:
        if not isinstance(raw, dict):
            continue

        name = str(raw.get("name") or "Item")
        qty = max(1, min(int(raw.get("quantity") or 1), 1_000_000_000))

        try:
            unit = float(raw.get("unitAmountPhp") or 0)
        except (TypeError, ValueError):
            unit = 0.0

        total = int(round(unit * 100)) * qty
        rows.append(f"  - {name} × {qty}  {format_php_centavos(total)}")

    return "\n".join(rows) if rows else "  (no line details)"


def country_code(raw: Any) -> str:
    s = str(raw or "").strip().upper()
    return s if len(s) == 2 and s.isalpha() else "PH"


def build_paymongo_address(shipping: dict[str, Any]) -> dict[str, str]:
    street = str(shipping.get("street") or "").strip()
    barangay = str(shipping.get("barangay") or "").strip()
    city = str(shipping.get("city") or "").strip()
    province = str(shipping.get("province") or "").strip()
    region = str(shipping.get("region") or "").strip()

    if street or barangay or province or region:
        line1 = street or f"Brgy. {barangay}" or city or "."
        line2_parts = []
        if street and barangay:
            line2_parts.append(f"Brgy. {barangay}")
        if province:
            line2_parts.append(province)
        if region:
            line2_parts.append(region)

        return {
            "line1": line1[:255],
            "line2": ", ".join(line2_parts)[:255],
            "city": (city or province or "PH")[:100],
            "country": "PH",
        }

    return {
        "line1": str(shipping.get("line1") or ".")[:255],
        "city": (city or ".")[:100],
        "country": country_code(shipping.get("country")),
    }