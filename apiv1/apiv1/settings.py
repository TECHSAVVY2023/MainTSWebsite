from datetime import timedelta
from pathlib import Path
import os
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# ------------------------------------------------------------
# Security
# ------------------------------------------------------------
SECRET_KEY = os.getenv("DJANGO_SECRET_KEY")
DEBUG = True
ALLOWED_HOSTS = ['188.166.211.139', '127.0.0.1', 'api.techsavvies.space', 'localhost']
PUBLIC_SITE = os.getenv("PAYMONGO_PUBLIC_BASE_URL", "").strip().rstrip("/")


CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
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

# PayMongo (and related) payment settings — single source: tsapi.payment_config + .env
from tsapi import payment_config as _payment_config


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
>>>>>>> f1eed00 (4/2/2026 Updates)


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
# Email
# ------------------------------------------------------------
EMAIL_BACKEND = os.getenv("EMAIL_BACKEND", "django.core.mail.backends.smtp.EmailBackend")
EMAIL_HOST = os.getenv("EMAIL_HOST", "smtp.gmail.com")
EMAIL_PORT = int(os.getenv("EMAIL_PORT", 587))
EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS", "True") == "True"
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL", "TechSavvy <info@techsavvy.space>")
ADMIN_NOTIFICATION_EMAIL = os.getenv("ADMIN_NOTIFICATION_EMAIL","info@techsavvy.space")

# ------------------------------------------------------------
# PayMongo
# ------------------------------------------------------------
PAYMONGO_WEBHOOK_SECRET = os.getenv("PAYMONGO_WEBHOOK_SECRET", "").strip()
PAYMONGO_PUBLIC_BASE_URL = os.getenv("PAYMONGO_PUBLIC_BASE_URL")
PAYMONGO_SECRET_KEY = os.getenv("PAYMONGO_SECRET_KEY", "").strip()
PAYMONGO_PAYMENT_METHOD_TYPES = os.getenv("PAYMONGO_PAYMENT_METHOD_TYPES", "card,gcash,paymaya,qrph")

# Re-export for code that reads django.conf.settings (checkout + webhooks).
PAYMONGO_WEBHOOK_SECRET = _payment_config.PAYMONGO_WEBHOOK_SECRET
PAYMONGO_PUBLIC_BASE_URL = _payment_config.PAYMONGO_PUBLIC_BASE_URL
PAYMONGO_SECRET_KEY = _payment_config.PAYMONGO_SECRET_KEY
PAYMONGO_PAYMENT_METHOD_TYPES = _payment_config.PAYMONGO_PAYMENT_METHOD_TYPES

