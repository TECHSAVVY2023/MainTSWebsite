from django.contrib import admin
from .models import TechsavvyModels, DataPostingCMSModel, FileUploadModel

# Register your models here.
admin.site.register(TechsavvyModels)

class DataPostingCMSModelAdmin(admin.ModelAdmin):
    list_display = ['content_id', 'title', 'authors', 'filters', 'approval_status', 'created_at']

admin.site.register(DataPostingCMSModel, DataPostingCMSModelAdmin)
admin.site.register(FileUploadModel)