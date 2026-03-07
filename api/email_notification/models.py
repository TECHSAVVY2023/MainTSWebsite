from django.db import models
from django.template import defaultfilters

class EmailNotification(models.Model):
  incharge_firstname = models.CharField(max_length=255)
  incharge_contact_email = models.CharField(max_length=255)
  schedule = models.CharField(max_length=255)
  approval_status = models.CharField(max_length=255)
  remarks = models.CharField(max_length=255)
  tracking_id= models.CharField(max_length=255)
  purpose = models.CharField(max_length=255)

  def __str__(self):
    return self.incharge_contact_email