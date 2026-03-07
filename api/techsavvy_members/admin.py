from django.contrib import admin
from .models import TechsavvyModels

class TechsavvyAdmin(admin.ModelAdmin):
    list_display = ("firstname", "lastname", "idNumber", "role", "created_at")
    search_fields = ("firstname", "lastname", "idNumber")
    
# Register your models here.
admin.site.register(TechsavvyModels, TechsavvyAdmin)

