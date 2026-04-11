"""
PayMongo payment integration — configuration only from the API environment.

Copy `apiv1/env.txt` to `apiv1/.env` and set values there. Never commit `.env`
or put secret keys in the Nuxt app.
"""
from __future__ import annotations

import os


def _env_string(key: str, default: str = "") -> str:
    """Trimmed string from os.environ."""
    return os.environ.get(key, default).strip()


def _env_payment_method_types_csv(default_csv: str) -> str:
    """
    Comma-separated PayMongo `payment_method_types` for checkout sessions.
    Must match methods enabled on the PayMongo merchant account.
    """
    raw = _env_string("PAYMONGO_PAYMENT_METHOD_TYPES")
    return raw if raw else default_csv


PAYMONGO_SECRET_KEY: str = _env_string("PAYMONGO_SECRET_KEY")

PAYMONGO_WEBHOOK_SECRET: str = _env_string("PAYMONGO_WEBHOOK_SECRET")

PAYMONGO_PUBLIC_BASE_URL: str = _env_string("PAYMONGO_PUBLIC_BASE_URL").rstrip("/")

PAYMONGO_PAYMENT_METHOD_TYPES: str = _env_payment_method_types_csv(
    "card,gcash,paymaya,qrph"
)

PAYMONGO_CHECKOUT_SESSIONS_URL: str = "https://api.paymongo.com/v1/checkout_sessions"
