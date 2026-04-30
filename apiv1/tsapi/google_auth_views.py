"""
Google OAuth: start + callback. Secrets live in oauth_config / .env only.
"""
from __future__ import annotations

import base64
import json
import logging
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timedelta, timezone

import jwt
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.views.decorators.http import require_GET

from tsapi import oauth_config

logger = logging.getLogger(__name__)

ALLOWED_EMAIL_DOMAINS = frozenset(
    {
        "lsu.edu.ph",
        "gmail.com",
        "yahoo.com",
        "aptitudeentertainment.com",
        "outlook.com",
        "microsoft.com",
        "techsavvies.space",
    }
)

GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth"
GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token"
GOOGLE_USERINFO_URL = "https://www.googleapis.com/oauth2/v3/userinfo"


def _http_form_post(url: str, data: dict[str, str]) -> dict:
    body = urllib.parse.urlencode(data).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=body,
        method="POST",
        headers={"Content-Type": "application/x-www-form-urlencoded"},
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))


def _http_get_json(url: str, headers: dict[str, str]) -> dict:
    req = urllib.request.Request(url, method="GET", headers=headers)
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read().decode("utf-8"))


@require_GET
def google_auth_start(request):
    if not oauth_config.GOOGLE_CLIENT_ID:
        return HttpResponseRedirect(
            f"{oauth_config.FRONTEND_URL}/login?error=oauth_not_configured"
        )

    callback_path = reverse("oauth_callback")
    redirect_uri = request.build_absolute_uri(callback_path)
    state = base64.urlsafe_b64encode(redirect_uri.encode("utf-8")).decode("ascii").rstrip("=")

    params = {
        "client_id": oauth_config.GOOGLE_CLIENT_ID,
        "redirect_uri": redirect_uri,
        "response_type": "code",
        "scope": "openid email profile",
        "access_type": "offline",
        "prompt": "select_account consent",
        "state": state,
    }
    q = urllib.parse.urlencode(params)
    return HttpResponseRedirect(f"{GOOGLE_AUTH_URL}?{q}")


@require_GET
def google_auth_callback(request):
    front = oauth_config.FRONTEND_URL
    code = (request.GET.get("code") or "").strip()
    if not code:
        return HttpResponseRedirect(f"{front}/login?error=no_code")

    if not oauth_config.GOOGLE_CLIENT_ID or not oauth_config.GOOGLE_CLIENT_SECRET:
        return HttpResponseRedirect(f"{front}/login?error=oauth_not_configured")

    state_b64 = (request.GET.get("state") or "").strip()
    redirect_uri: str
    try:
        pad = "=" * (-len(state_b64) % 4)
        redirect_uri = base64.urlsafe_b64decode(state_b64 + pad).decode("utf-8")
    except Exception:
        callback_path = reverse("oauth_callback")
        redirect_uri = request.build_absolute_uri(callback_path)

    try:
        token_res = _http_form_post(
            GOOGLE_TOKEN_URL,
            {
                "code": code,
                "client_id": oauth_config.GOOGLE_CLIENT_ID,
                "client_secret": oauth_config.GOOGLE_CLIENT_SECRET,
                "redirect_uri": redirect_uri,
                "grant_type": "authorization_code",
            },
        )
        access_token = token_res.get("access_token")
        if not access_token:
            logger.warning("Google token response missing access_token: %s", token_res)
            return HttpResponseRedirect(f"{front}/login?error=oauth_failed")

        profile = _http_get_json(
            GOOGLE_USERINFO_URL,
            {"Authorization": f"Bearer {access_token}"},
        )
    except urllib.error.HTTPError as e:
        try:
            body = e.read().decode("utf-8", errors="replace")
        except Exception:
            body = str(e)
        logger.exception("Google OAuth HTTP error: %s", body)
        return HttpResponseRedirect(f"{front}/login?error=oauth_failed")
    except Exception:
        logger.exception("Google OAuth callback error")
        return HttpResponseRedirect(f"{front}/login?error=oauth_failed")

    email = (profile.get("email") or "").strip()
    domain = email.split("@")[1].lower() if "@" in email else ""
    if domain not in ALLOWED_EMAIL_DOMAINS:
        return HttpResponseRedirect(f"{front}/login?error=unauthorized")

    now = datetime.now(timezone.utc)
    payload = {
        "id": profile.get("sub"),
        "name": profile.get("name"),
        "email": email,
        "picture": profile.get("picture"),
        "iat": int(now.timestamp()),
        "exp": int((now + timedelta(days=7)).timestamp()),
    }
    token = jwt.encode(
        payload,
        oauth_config.AUTH_JWT_SECRET,
        algorithm="HS256",
    )
    if isinstance(token, bytes):
        token = token.decode("utf-8")

    return HttpResponseRedirect(f"{front}/dashboard?token={urllib.parse.quote(token, safe='')}")
