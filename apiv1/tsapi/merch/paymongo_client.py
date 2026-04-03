import base64
import json
import logging
from typing import Any
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

from django.conf import settings

logger = logging.getLogger(__name__)

PAYMONGO_API = "https://api.paymongo.com/v1/checkout_sessions"


class PayMongoApiError(Exception):
    def __init__(self, status: int, body: dict[str, Any]) -> None:
        super().__init__(str(body))
        self.status = status
        self.body = body


def _auth_header() -> str:
    key = getattr(settings, "PAYMONGO_SECRET_KEY", "")
    token = base64.b64encode(f"{key}:".encode()).decode()
    return f"Basic {token}"


def create_checkout_session(payload: dict[str, Any]) -> dict[str, Any]:
    req = Request(
        PAYMONGO_API,
        data=json.dumps(payload).encode(),
        headers={
            "Content-Type": "application/json",
            "Authorization": _auth_header(),
        },
        method="POST",
    )

    try:
        with urlopen(req, timeout=60) as resp:
            return json.loads(resp.read().decode())

    except HTTPError as e:
        body = e.read().decode()
        logger.warning("PayMongo error %s: %s", e.code, body[:500])
        raise PayMongoApiError(e.code, {"raw": body})

    except URLError as e:
        logger.exception("Network error")
        raise PayMongoApiError(0, {"message": str(e.reason)})