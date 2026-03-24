from django.contrib import admin

from .models import CmsItem, TechsavvyMembers


@admin.register(CmsItem)
class CmsItemAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "filters", "approval_status", "images",)
    list_filter = ("approval_status", "filters", "created_at")
    search_fields = ("title", "descriptions", "authors", "content_id", "filters")
    ordering = ("-created_at",)
    readonly_fields = ("filters",)


@admin.register(TechsavvyMembers)
class TechsavvyAdmin(admin.ModelAdmin):
    list_display = ("id", "firstname", "lastname", "idNumber", "role", "email", "created_at")
    list_filter = ("role", "created_at")
    search_fields = ("firstname", "lastname", "idNumber", "email")
    ordering = ("-created_at",)
