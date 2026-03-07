from django.db import models
from django_jsonform.models.fields import JSONField   # Correct JSONForm Field
from django.template import defaultfilters
from storages.backends.s3boto3 import S3Boto3Storage

# Create your models here.
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
    SEAT_AVAILABILITY_CHOICES = {
        'type': 'array',
        'items': {
            'type': 'object',
            'keys': {
                'reserved_by': {'type': 'string'},
                'reserved_by_id': {'type': 'string'},
                'seat_accessed_type': {'type': 'string'},
                'seat_number': {'type': 'string'},
                'seat_area': {'type': 'string'},
                'seat_price': {'type': 'integer'},
                'seat_status': {'type': 'string'},
            }
        }
    }
    content_id = models.CharField(max_length=255, blank=True, null=True, default='')
    title = models.CharField(max_length=255, blank=True, null=True, default='')
    authors = models.CharField(max_length=255, blank=True, null=True, default='')
    filters = models.CharField(max_length=255, blank=True, null=True, default='')
    event_date = models.DateTimeField(blank=True, null=True)
    descriptions = models.TextField(blank=True, null=True, default='')
    approval_status = models.CharField(max_length=50, blank=True, null=True, default='verified')
    links = JSONField(schema=LINK_URL, blank=True, null=True)
    files = JSONField(schema=FILES_SCHEMA, blank=True, null=True)
    logs = JSONField(schema=STATUS_LOGS, blank=True, null=True)
    seat_availability = JSONField(schema=SEAT_AVAILABILITY_CHOICES, blank=True, null=True)
    seat_capacity = models.IntegerField(blank=True, null=True, default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)

    def created_at_formatted(self):
        return defaultfilters.date(self.created_at, 'M d, Y')

class FileUploadModel(models.Model):
    file = models.FileField(storage=S3Boto3Storage(), upload_to='aptitude/assets/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name

class AECareersModel(models.Model):
    LINK_URL = {
        'type': 'array', # a list which will contain the items
        'items': {
            'type': 'string' # items in the array are strings
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
    application_id = models.CharField(max_length=255, blank=True, null=True, default='')
    fullname = models.CharField(max_length=255, blank=True, null=True, default='')
    contact_email = models.CharField(max_length=255, blank=True, null=True, default='')
    contact_number = models.CharField(max_length=255, blank=True, null=True, default='')
    position_application = models.CharField(max_length=255, blank=True, null=True, default='')
    years_of_experience = models.CharField(max_length=255, blank=True, null=True, default='')
    portfolio_url = models.CharField(max_length=255, blank=True, null=True, default='')
    tell_us_about_yourself_experience = models.TextField(blank=True, null=True, default='')
    resume = JSONField(schema=LINK_URL, blank=True, null=True)
    logs = JSONField(schema=STATUS_LOGS, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ('-created_at',)

    def created_at_formatted(self):
        return defaultfilters.date(self.created_at, 'M d, Y')

class AEFileUploadResumeModel(models.Model):
    file = models.FileField(storage=S3Boto3Storage(), upload_to='aptitude/resumes/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name