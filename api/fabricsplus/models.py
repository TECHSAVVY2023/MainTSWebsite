from django.db import models
from django_jsonform.models.fields import JSONField
from django.template import defaultfilters
from storages.backends.s3boto3 import S3Boto3Storage   

class ContactListModel(models.Model):
    contact_id = models.CharField(max_length=255, blank=True, null=True, default='')
    firstname = models.CharField(max_length=255, blank=True, null=True, default='')
    lastname = models.CharField(max_length=255, blank=True, null=True, default='')
    contact_email = models.CharField(max_length=255, blank=True, null=True, default='')
    contact_number = models.CharField(max_length=255, blank=True, null=True, default='')
    message = models.CharField(max_length=500, blank=True, null=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
  
    class Meta: 
        ordering = ('-created_at',)

    def created_at_formatted(self):
        return defaultfilters.date(self.created_at, 'M d, Y')
    
class ItemListModel(models.Model):
    ITEMS_SCHEMA_FILES = {
        'type' : 'array',
        'items' : {
            'type' : 'object',
            'keys' : {
                'name' : {
                    'type' : 'string'
                },
                'url' : {
                    'type' : 'string'
                }
            }
        }
    }
    item_id = models.CharField(max_length=255, blank=True, null=True, default='')
    title = models.CharField(max_length=255, blank=True, null=True, default='')
    description = models.CharField(max_length=255, blank=True, null=True, default='')
    thumbnail = JSONField(schema=ITEMS_SCHEMA_FILES, null=True)
    banner_image = models.CharField(max_length=255, blank=True, null=True, default='')
    category_name = models.CharField(max_length=500, blank=True, null=True, default='')
    is_published = models.CharField(max_length=255, blank=True, null=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
  
    class Meta: 
        ordering = ('-created_at',)

    def created_at_formatted(self):
        return defaultfilters.date(self.created_at, 'M d, Y')

class DataPostingCMSModel(models.Model):
    LINK_URL = {
        'type': 'array', # a list which will contain the items
        'items': {
            'type': 'string' # items in the array are strings
        }
    }
    FILES_SCHEMA = {
        'type': 'array',
        'items': {
            'type': 'object',
            'keys': {
                'name': {'type': 'string'},
                'url': {'type': 'string'}
            }
        }
    }
    STATUS_LOGS = {
        'type': 'array',
        'items': {
            'type': 'object',
            'keys': {
                'personnel_fullname': {'type': 'string'},
                'personnel_designation': {'type': 'string'},
                'personnel_email': {'type': 'string'},
                'remarks_title': {'type': 'string'},
                'remarks_description': {'type': 'string'},
                'timestamp': {'type': 'string'}
            }
        }
    }
    content_id = models.CharField(max_length=255, blank=True, null=True, default='')
    title = models.CharField(max_length=255, blank=True, null=True, default='')
    authors = models.CharField(max_length=255, blank=True, null=True, default='')
    filters = models.CharField(max_length=255, blank=True, null=True, default='')
    descriptions = models.TextField(blank=True, null=True, default='')
    approval_status = models.CharField(max_length=50, blank=True, null=True, default='verified')
    links = JSONField(schema=LINK_URL, blank=True, null=True)
    files = JSONField(schema=FILES_SCHEMA, blank=True, null=True)
    logs = JSONField(schema=STATUS_LOGS, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)

    def created_at_formatted(self):
        return defaultfilters.date(self.created_at, 'M d, Y')

class FileUploadModel(models.Model):
    file = models.FileField(storage=S3Boto3Storage(), upload_to='fabricsplus/assets/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name