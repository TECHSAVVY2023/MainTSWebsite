from django.contrib import admin

# Register your models here.

from .models import ContactListModel, ItemListModel, DataPostingCMSModel, FileUploadModel

class OrderDetailsModelAdmin(admin.ModelAdmin):
    list_display = ['contact_id', 'firstname', 'lastname', 'contact_email', 'contact_number', 'message', 'created_at']

admin.site.register(ContactListModel, OrderDetailsModelAdmin)

class ItemListModelAdmin(admin.ModelAdmin):
    list_display = ['item_id', 'title', 'description', 'thumbnail', 'banner_image', 'category_name', 'is_published', 'created_at']

admin.site.register(ItemListModel, ItemListModelAdmin)

class DataPostingCMSModelAdmin(admin.ModelAdmin):
    list_display = ['content_id', 'title', 'authors', 'filters', 'approval_status', 'created_at']

admin.site.register(DataPostingCMSModel, DataPostingCMSModelAdmin)
admin.site.register(FileUploadModel)
