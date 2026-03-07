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
ALLOWED_HOSTS = ['188.166.211.139', '127.0.0.1', 'api.techsavvies.space']

# ------------------------------------------------------------
# Installed Apps
# ------------------------------------------------------------
INSTALLED_APPS = [
    'corsheaders',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'rest_framework',
    'landingPage',
    'email_notification',
    'register',
    'django_jsonform', 
    'delgar',
    'techsavvyapi',
    'techsavvy_members',
    'aptitude',
    'fabricsplus',
    'techsavvy_app',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'api.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
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

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.FormParser',
        'rest_framework.parsers.MultiPartParser',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [],
    'DEFAULT_PERMISSION_CLASSES': [],
}


WSGI_APPLICATION = 'api.wsgi.application'

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

# Allow credentials and specific headers for file uploads
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

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
# Static & Media
# ------------------------------------------------------------
AWS_ACCESS_KEY_ID = 'DO002GTKXEGF9LLX44LH' #Get from your DO account
AWS_SECRET_ACCESS_KEY = '9YZeEX8UfcCRRCeLOtbUhvkdDxY+PcHZLKWQ1CK7IRw'
AWS_STORAGE_BUCKET_NAME = 'fpstorage'
AWS_LOCATION = "www.techsavvies.space"
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

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/
# STATIC_URL = 'static/'
# STATIC_ROOT = 'static/'
# MEDIA_URL = 'media/'

# ------------------------------------------------------------
# File Upload Settings
# ------------------------------------------------------------
# Increase file upload size limits to support large files (500MB)
DATA_UPLOAD_MAX_MEMORY_SIZE = 524288000  # 500MB in bytes
FILE_UPLOAD_MAX_MEMORY_SIZE = 524288000  # 500MB in bytes

# ------------------------------------------------------------
# Misc
# ------------------------------------------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
