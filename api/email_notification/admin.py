from django.contrib import admin

# Register your models here.

from .models import EmailNotification

admin.site.register(EmailNotification)