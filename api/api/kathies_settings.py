"""
backend/settings.py
Django settings for backend project.
Prepared for Google OAuth + Nuxt Auth (JWT-ready).
"""
from datetime import timedelta
from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent

# ------------------------------------------------------------
# Security
# ------------------------------------------------------------
SECRET_KEY = "django-insecure-o!!jy$u_%!@+wz54*2q65kcs(1o2*!8j663+xm_0vvt2o^km^j"
DEBUG = False
ALLOWED_HOSTS = ['127.0.0.1', 'localhost', 'kathieskitchen.com', 'www.kathieskitchen.com', 'api.kathieskitchen.com']

# ------------------------------------------------------------
# Installed Apps
# ------------------------------------------------------------
INSTALLED_APPS = [
    # Core
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # Third-party
    'rest_framework',
    'rest_framework.authtoken',
    'rest_framework_simplejwt.token_blacklist', 
    'corsheaders',
    'django_filters',
    'dj_rest_auth',
    'dj_rest_auth.registration',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.google',
    'storages',

    # Local apps
    'main',
]

# ------------------------------------------------------------
# Middleware
# ------------------------------------------------------------
MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "allauth.account.middleware.AccountMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = 'backend.urls'

# ------------------------------------------------------------
# Templates
# ------------------------------------------------------------
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

# ------------------------------------------------------------
# Database
# ------------------------------------------------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# ------------------------------------------------------------
# Authentication & REST Framework
# ------------------------------------------------------------
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication', 
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
    ],
}

# ------------------------------------------------------------
# JWT Settings
# ------------------------------------------------------------
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=4),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

REST_USE_JWT = True
JWT_AUTH_COOKIE = 'access'
JWT_AUTH_REFRESH_COOKIE = 'refresh'

# ------------------------------------------------------------
# CORS / CSRF / Sessions
# ------------------------------------------------------------
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://kathieskitchen.com",
    "https://www.kathieskitchen.com",
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_HEADERS = [
    "authorization",
    "content-type",
    "accept",
    "origin",
    "x-requested-with",
]

CSRF_TRUSTED_ORIGINS = [
    "https://kathieskitchen.com",
    "https://www.kathieskitchen.com",
]

# 4-hour cookie session
SESSION_COOKIE_AGE = 60 * 60 * 4
SESSION_EXPIRE_AT_BROWSER_CLOSE = True
SESSION_COOKIE_SAMESITE = "Lax"
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = False

# ------------------------------------------------------------
# Email
# ------------------------------------------------------------
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_SSL = False
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'info@techsavvies.space'
EMAIL_HOST_PASSWORD = 'nahv txew pkdv gzbj'
DEFAULT_FROM_EMAIL = 'info@techsavvies.space'

# ------------------------------------------------------------
# Static & Media
# ------------------------------------------------------------

AWS_ACCESS_KEY_ID = 'DO002GTKXEGF9LLX44LH' #Get from your DO account
AWS_SECRET_ACCESS_KEY = '9YZeEX8UfcCRRCeLOtbUhvkdDxY+PcHZLKWQ1CK7IRw'
AWS_STORAGE_BUCKET_NAME = 'fpstorage'
AWS_LOCATION = "www.kathieskitchen.com"
AWS_S3_ENDPOINT_URL = 'https://sgp1.digitaloceanspaces.com' 
AWS_S3_REGION_NAME = 'sgp1' # e.g., 'nyc3', 'sgp1'
AWS_DEFAULT_ACL = 'public-read'  # Or your desired ACL

STORAGES = {
    "default": {
        "BACKEND": "storages.backends.s3boto3.S3Boto3Storage",
        "OPTIONS": {
            "location": AWS_LOCATION,
        },
    },
    "staticfiles": {
        "BACKEND": "django.contrib.staticfiles.storage.StaticFilesStorage",
    },
}

MEDIA_URL = f"{AWS_S3_ENDPOINT_URL}/{AWS_STORAGE_BUCKET_NAME}/{AWS_LOCATION}/"

STATIC_URL = 'staticfiles/'
STATIC_ROOT = 'staticfiles/'

# ------------------------------------------------------------
# Misc
# ------------------------------------------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
