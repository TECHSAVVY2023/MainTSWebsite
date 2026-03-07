from django.contrib import admin
from .models import DataPostingCMSModel, FileUploadModel, AECareersModel, AEFileUploadResumeModel

# Register your models here.

class DataPostingCMSModelAdmin(admin.ModelAdmin):
    list_display = ['content_id', 'title', 'authors', 'filters', 'approval_status', 'created_at']

class CareersModelAdmin(admin.ModelAdmin):
    list_display = ['application_id', 'fullname', 'contact_email', 'position_application', 'created_at']

admin.site.register(DataPostingCMSModel, DataPostingCMSModelAdmin)
admin.site.register(FileUploadModel)
admin.site.register(AECareersModel, CareersModelAdmin)
admin.site.register(AEFileUploadResumeModel)
