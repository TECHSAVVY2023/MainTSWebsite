"""
PayMongo payment integration — configuration only from the API environment.

Copy `apiv1/env.txt` to `apiv1/.env` and set values there. Never commit `.env`
or put secret keys in the Nuxt app.
"""
from __future__ import annotations

import os

# ---------------------------------------------------------------------------
# Environment readers (values populated by Django `load_dotenv` in settings)
# ---------------------------------------------------------------------------


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


# Secret REST API key (sk_test_... / sk_live_...) — server-only; creates checkout sessions.
PAYMONGO_SECRET_KEY: str = _env_string("PAYMONGO_SECRET_KEY")

# Webhook signing secret (whsk_...) from PayMongo → Webhooks → endpoint settings.
PAYMONGO_WEBHOOK_SECRET: str = _env_string("PAYMONGO_WEBHOOK_SECRET")

# Public site base URL (https://...) for CSRF/CORS and webhook health hints; no trailing slash.
PAYMONGO_PUBLIC_BASE_URL: str = _env_string("PAYMONGO_PUBLIC_BASE_URL").rstrip("/")

# Raw CSV for payment_method_types (parsed in paymongo_checkout).
PAYMONGO_PAYMENT_METHOD_TYPES: str = _env_payment_method_types_csv(
    "card,gcash,paymaya,qrph"
)

# PayMongo REST endpoint for checkout sessions (fixed; not overridden by env).
PAYMONGO_CHECKOUT_SESSIONS_URL: str = "https://api.paymongo.com/v1/checkout_sessions"
