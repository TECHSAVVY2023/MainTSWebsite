"""
Google OAuth + session JWT — read only from the API environment (apiv1/.env).

Do not put GOOGLE_CLIENT_SECRET or AUTH_JWT_SECRET in the Nuxt app.
"""
from __future__ import annotations

import os


def _env_string(key: str, default: str = "") -> str:
    return os.environ.get(key, default).strip()


GOOGLE_CLIENT_ID: str = _env_string("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET: str = _env_string("GOOGLE_CLIENT_SECRET")

FRONTEND_URL: str = _env_string("FRONTEND_URL", "http://localhost:3000").rstrip("/")

AUTH_JWT_SECRET: str = _env_string("AUTH_JWT_SECRET") or _env_string("DJANGO_SECRET_KEY") or "change-this-secret"
