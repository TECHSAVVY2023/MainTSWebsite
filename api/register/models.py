from django.db import models
from django.template import defaultfilters
from storages.backends.s3boto3 import S3Boto3Storage  
from django_jsonform.models.fields import JSONField

class ConfirmReceiptModel(models.Model):
  WEBINAR_TOPICS = {
    'type' : 'array',
    'items' : {
      'type' : 'string'
    }
  }
  team_member_id = models.CharField(max_length=255, blank=True, null=True, default='')
  fullname = models.CharField(max_length=255, blank=True, null=True, default='')
  birth_date = models.CharField(max_length=255, blank=True, null=True, default='')
  contact_email = models.CharField(max_length=255, blank=True, null=True, default='')
  contact_number = models.CharField(max_length=255, blank=True, null=True, default='')
  tech_level = models.CharField(max_length=255, blank=True, null=True, default='')
  preferred_topics = JSONField(schema=WEBINAR_TOPICS, null=True)
  registration_fee = models.CharField(max_length=255, blank=True, null=True, default='')
  payment_method = models.CharField(max_length=255, blank=True, null=True, default='')
  receipt_url = models.CharField(max_length=500, blank=True, null=True, default='')
  data_privacy_consent = models.CharField(max_length=255, blank=True, null=True, default='')
  created_at = models.DateTimeField(auto_now_add=True)

  class Meta: 
    ordering = ('-created_at',)

  def created_at_formatted(self):
    return defaultfilters.date(self.created_at, 'M d, Y')

class DonationModel(models.Model):
  donation_id = models.CharField(max_length=255, blank=True, null=True, default='')
  fullname = models.CharField(max_length=255, blank=True, null=True, default='')
  contact_email = models.CharField(max_length=255, blank=True, null=True, default='')
  amount = models.CharField(max_length=255, blank=True, null=True, default='')
  payment_method = models.CharField(max_length=255, blank=True, null=True, default='')
  receipt_url = models.CharField(max_length=500, blank=True, null=True, default='')
  created_at = models.DateTimeField(auto_now_add=True)

  class Meta: 
    ordering = ('-created_at',)

  def created_at_formatted(self):
    return defaultfilters.date(self.created_at, 'M d, Y')
  
class RegistrationModel(models.Model):
  ADD_ONS = {
    'type' : 'array',
    'items' : {
      'type' : 'string'
    }
  }
  registration_id = models.CharField(max_length=255, blank=True, null=True, default='')
  fullname = models.CharField(max_length=255, blank=True, null=True, default='')
  contact_email = models.CharField(max_length=255, blank=True, null=True, default='')
  contact_number = models.CharField(max_length=255, blank=True, null=True, default='')
  payment_method = models.CharField(max_length=255, blank=True, null=True, default='')
  base_amount = models.CharField(max_length=255, blank=True, null=True, default='')
  member = models.CharField(max_length=255, blank=True, null=True, default='')
  add_ons = JSONField(schema=ADD_ONS, null=True)
  receipt_url = models.CharField(max_length=500, blank=True, null=True, default='')
  created_at = models.DateTimeField(auto_now_add=True)

  class Meta: 
    ordering = ('-created_at',)

  def created_at_formatted(self):
    return defaultfilters.date(self.created_at, 'M d, Y')
  
class FileUploadModel(models.Model):
  file = models.FileField(storage=S3Boto3Storage(), upload_to='codecamp/receipt/uploads/')
  uploaded_at = models.DateTimeField(auto_now_add=True)

  def __str__(self):
    return self.file.name
