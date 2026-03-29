from django.contrib import admin

from .models import CmsItem, MerchCheckoutOrder, PaymongoWebhookEvent, TechsavvyMembers


@admin.register(CmsItem)
class CmsItemAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "filters", "approval_status", "images",)
    list_filter = ("approval_status", "filters", "created_at")
    search_fields = ("title", "descriptions", "authors", "content_id", "filters")
    ordering = ("-created_at",)
    readonly_fields = ("filters",)


@admin.register(MerchCheckoutOrder)
class MerchCheckoutOrderAdmin(admin.ModelAdmin):
    list_display = (
        "reference_number",
        "status",
        "checkout_session_id",
        "total_centavos",
        "created_at",
    )
    list_filter = ("status", "created_at")
    search_fields = ("reference_number", "checkout_session_id")
    readonly_fields = (
        "reference_number",
        "checkout_session_id",
        "lines_json",
        "shipping_snapshot",
        "total_centavos",
        "created_at",
        "updated_at",
    )
    ordering = ("-created_at",)


@admin.register(PaymongoWebhookEvent)
class PaymongoWebhookEventAdmin(admin.ModelAdmin):
    list_display = ("paymongo_event_id", "event_type", "livemode", "created_at")
    list_filter = ("event_type", "livemode", "created_at")
    search_fields = ("paymongo_event_id", "event_type")
    readonly_fields = ("paymongo_event_id", "event_type", "livemode", "payload", "created_at")
    ordering = ("-created_at",)


@admin.register(TechsavvyMembers)
class TechsavvyAdmin(admin.ModelAdmin):
    list_display = ("id", "firstname", "lastname", "idNumber", "role", "speaker_topic", "email", "created_at")
    list_filter = ("role", "created_at")
    search_fields = ("firstname", "lastname", "idNumber", "email")
    ordering = ("-created_at",)
