from django.contrib import admin

# Register your models here.

from .models import ConfirmReceiptModel, DonationModel, RegistrationModel

class RegistrationModelAdmin(admin.ModelAdmin):
    list_display = ['registration_id', 'fullname', 'contact_email', 'contact_number', 'payment_method', 'base_amount', 'member', 'add_ons', 'receipt_url', 'created_at']

admin.site.register(ConfirmReceiptModel)
admin.site.register(DonationModel)
admin.site.register(RegistrationModel, RegistrationModelAdmin)