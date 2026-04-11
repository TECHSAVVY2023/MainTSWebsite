from datetime import timedelta
from pathlib import Path
import os
from dotenv import load_dotenv
from django.core.exceptions import ImproperlyConfigured

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

DEBUG = os.getenv("DJANGO_DEBUG", "True").lower() in ("1", "true", "yes")
SECRET_KEY = (os.getenv("DJANGO_SECRET_KEY") or "").strip()
if not SECRET_KEY:
    if DEBUG:
        SECRET_KEY = "django-insecure-dev-only-set-DJANGO_SECRET_KEY-for-production"
    else:
        raise ImproperlyConfigured("DJANGO_SECRET_KEY must be set when DEBUG is False.")
ALLOWED_HOSTS = ['*']
PUBLIC_SITE = os.getenv("PAYMONGO_PUBLIC_BASE_URL", "").strip().rstrip("/")


CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
    "https://techsavvies.space",
    "https://lsu.edu.ph",
    "https://www.lsu.edu.ph",
    "https://www.delgar.store",
    "https://delgar.store",
    "https://aptitudeentertainment.com",
    "https://www.aptitudeentertainment.com",
    "https://fabricspluscurtains.com",
    "https://www.fabricspluscurtains.com",
]

from tsapi import payment_config as _payment_config

from tsapi import oauth_config as _oauth_config

def _comma_separated_urls(key: str) -> list[str]:
    raw = os.environ.get(key, "")
    return [x.strip() for x in raw.split(",") if x.strip()]


def _dedupe_preserve(seq: list[str]) -> list[str]:
    seen: set[str] = set()
    out: list[str] = []
    for x in seq:
        if x not in seen:
            seen.add(x)
            out.append(x)
    return out


_public_site = _payment_config.PAYMONGO_PUBLIC_BASE_URL
CSRF_TRUSTED_ORIGINS = _dedupe_preserve(
    [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "https://localhost:3000",
        "https://127.0.0.1:3000",
    ]
    + _comma_separated_urls("CSRF_TRUSTED_ORIGINS")
    + (
        [_public_site]
        if _public_site.startswith(("http://", "https://"))
        else []
    )
)

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",
    "django_filters",
    "tsapi",
    "landingPage",
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'apiv1.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'apiv1.wsgi.application'



DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


STATIC_URL = 'static/'

MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",
    ],
    "DEFAULT_FILTER_BACKENDS": [
        "django_filters.rest_framework.DjangoFilterBackend",
    ],
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(hours=4),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=7),
    "ROTATE_REFRESH_TOKENS": True,
    "AUTH_HEADER_TYPES": ("Bearer",),
}

EMAIL_BACKEND = os.getenv("EMAIL_BACKEND", "django.core.mail.backends.smtp.EmailBackend")
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", 587))
EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS", "True") == "True"
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL", "TechSavvy <info@techsavvy.space>")
ADMIN_NOTIFICATION_EMAIL = os.getenv("ADMIN_NOTIFICATION_EMAIL","info@techsavvy.space")

PAYMONGO_WEBHOOK_SECRET = os.getenv("PAYMONGO_WEBHOOK_SECRET", "").strip()
PAYMONGO_PUBLIC_BASE_URL = os.getenv("PAYMONGO_PUBLIC_BASE_URL")
PAYMONGO_SECRET_KEY = os.getenv("PAYMONGO_SECRET_KEY", "").strip()
PAYMONGO_PAYMENT_METHOD_TYPES = os.getenv("PAYMONGO_PAYMENT_METHOD_TYPES", "card,gcash,paymaya,qrph")

PAYMONGO_WEBHOOK_SECRET = _payment_config.PAYMONGO_WEBHOOK_SECRET
PAYMONGO_PUBLIC_BASE_URL = _payment_config.PAYMONGO_PUBLIC_BASE_URL
PAYMONGO_SECRET_KEY = _payment_config.PAYMONGO_SECRET_KEY
PAYMONGO_PAYMENT_METHOD_TYPES = _payment_config.PAYMONGO_PAYMENT_METHOD_TYPES

MERCH_CHECKOUT_DESCRIPTION = (
    os.getenv("MERCH_CHECKOUT_DESCRIPTION", "Tech Savvy merchandise").strip() or "Tech Savvy merchandise"
)
MERCH_SEND_CUSTOM_RECEIPT_EMAIL = os.getenv(
    "MERCH_SEND_CUSTOM_RECEIPT_EMAIL", "false"
).lower() in ("1", "true", "yes")

GOOGLE_CLIENT_ID = _oauth_config.GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET = _oauth_config.GOOGLE_CLIENT_SECRET
FRONTEND_URL = _oauth_config.FRONTEND_URL
AUTH_JWT_SECRET = _oauth_config.AUTH_JWT_SECRET

