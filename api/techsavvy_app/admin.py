from django.contrib import admin
from .models import TechsavvyModels, DataPostingCMSModel, FileUploadModel

# Register your models here.
admin.site.register(TechsavvyModels)

class DataPostingCMSModelAdmin(admin.ModelAdmin):
    list_display = ['content_id', 'title', 'authors', 'filter_category', 'approval_status', 'created_at']
    readonly_fields = ['filters']

    def filter_category(self, obj):
        if isinstance(obj.filters, dict):
            return obj.filters.get('category', '')
        return obj.filters or ''
    filter_category.short_description = 'Category'

admin.site.register(DataPostingCMSModel, DataPostingCMSModelAdmin)
admin.site.register(FileUploadModel)