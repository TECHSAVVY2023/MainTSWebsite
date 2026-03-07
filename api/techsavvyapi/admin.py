from django.contrib import admin
from .models import ContactRequest


@admin.register(ContactRequest)
class ContactRequestAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "email",
        "interest",
        "billing_option",
        "created_at",
        "is_processed",
    )
    list_filter = ("interest", "billing_option", "is_processed", "created_at")
    search_fields = ("name", "email", "business", "message")
    readonly_fields = ("created_at", "ip_address", "user_agent")

    fieldsets = (
        ("Contact Info", {
            "fields": ("name", "email", "business")
        }),
        ("Request Details", {
            "fields": ("interest", "billing_option", "message")
        }),
        ("Meta", {
            "fields": ("ip_address", "user_agent", "created_at", "is_processed")
        }),
    )
