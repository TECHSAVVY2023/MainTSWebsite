"""
Django settings for apiv1 project.
JWT-ready, dotenv, following reference/api (boss) patterns.
"""

from datetime import timedelta
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

_os_env = __import__("os").environ

SECRET_KEY = _os_env.get("SECRET_KEY", "django-insecure-change-me")
DEBUG = _os_env.get("DEBUG", "True").lower() in ("true", "1")
ALLOWED_HOSTS = ["*"]


def _comma_separated_urls(key: str) -> list[str]:
    raw = _os_env.get(key, "")
    return [x.strip() for x in raw.split(",") if x.strip()]


def _dedupe_preserve(seq: list[str]) -> list[str]:
    seen: set[str] = set()
    out: list[str] = []
    for x in seq:
        if x not in seen:
            seen.add(x)
            out.append(x)
    return out


# Browser POSTs (admin, DRF, etc.) send Origin; Django 4+ must trust it or CSRF fails (e.g. ngrok front-end).
_public_site = _os_env.get("PAYMONGO_PUBLIC_BASE_URL", "").strip().rstrip("/")
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


# Application definition
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


# Password validation
# https://docs.djangoproject.com/en/6.0/ref/settings/#auth-password-validators

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


# Internationalization
# https://docs.djangoproject.com/en/6.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/6.0/howto/static-files/

STATIC_URL = 'static/'

# Media files (user uploads)
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

# ------------------------------------------------------------
# REST Framework & JWT (boss-style)
# ------------------------------------------------------------
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": [
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.AllowAny",  # Public API; use IsAdminUser on admin ViewSets
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

# ------------------------------------------------------------
# CORS for dev-ui (Nuxt on port 3000) and tunneled dev (ngrok, etc.)
# ------------------------------------------------------------
CORS_ALLOWED_ORIGINS = _dedupe_preserve(
    [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
    + _comma_separated_urls("CORS_ALLOWED_ORIGINS")
    + (
        [_public_site]
        if _public_site.startswith(("http://", "https://"))
        else []
    )
)
CORS_ALLOW_CREDENTIALS = True

# ------------------------------------------------------------
# Email (optional; for member confirmation)
# ------------------------------------------------------------
EMAIL_BACKEND = _os_env.get(
    "EMAIL_BACKEND", "django.core.mail.backends.console.EmailBackend"
)
DEFAULT_FROM_EMAIL = _os_env.get("DEFAULT_FROM_EMAIL", "noreply@localhost")


PAYMONGO_WEBHOOK_SECRET = _os_env.get("PAYMONGO_WEBHOOK_SECRET", "").strip()
PAYMONGO_PUBLIC_BASE_URL = _public_site
# Secret API key (sk_test_... / sk_live_...) — create Checkout Sessions server-side only.
PAYMONGO_SECRET_KEY = _os_env.get("PAYMONGO_SECRET_KEY", "").strip()
# Comma-separated PayMongo payment_method_types (must match your merchant-enabled methods).
PAYMONGO_PAYMENT_METHOD_TYPES = _os_env.get(
    "PAYMONGO_PAYMENT_METHOD_TYPES", "card,gcash,paymaya,qrph"
)
