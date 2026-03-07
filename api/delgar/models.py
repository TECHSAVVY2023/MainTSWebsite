from django.db import models
from django_jsonform.models.fields import JSONField
from django.template import defaultfilters
from storages.backends.s3boto3 import S3Boto3Storage  

class OrderDetailsModel(models.Model):
    ITEMS_SCHEMA_FILES = {
        'type' : 'array',
        'items' : {
            'type' : 'object',
            'keys' : {
                'product_id' : {
                    'type' : 'string'
                },
                'product_image' : {
                    'type' : 'string'
                },
                'product_name' : {
                    'type' : 'string'
                },
                'quantity' : {
                    'type' : 'string'
                },
                'total_amount' : {
                    'type' : 'string'
                },
                'purchase_type' : {
                    'type' : 'string'
                }
            }
        }
    }
    order_id = models.CharField(max_length=255, blank=True, null=True, default='')
    fullname = models.CharField(max_length=255, blank=True, null=True, default='')
    delivery_address = models.CharField(max_length=255, blank=True, null=True, default='')
    contact_email = models.CharField(max_length=255, blank=True, null=True, default='')
    contact_number = models.CharField(max_length=255, blank=True, null=True, default='')
    system_fee = models.CharField(max_length=255, blank=True, null=True, default='')
    delivery_fee = models.CharField(max_length=255, blank=True, null=True, default='')
    grand_total = models.CharField(max_length=255, blank=True, null=True, default='')
    payment_method = models.CharField(max_length=255, blank=True, null=True, default='')                            
    receipt_url = models.CharField(max_length=500,blank=True, null=True, default='')
    products = JSONField(schema=ITEMS_SCHEMA_FILES, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
  
    class Meta: 
        ordering = ('-created_at',)

    def created_at_formatted(self):
        return defaultfilters.date(self.created_at, 'M d, Y')
    
class ProductListModel(models.Model):
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
    product_id = models.CharField(max_length=255, blank=True, null=True, default='')                          
    product_image = JSONField(schema=ITEMS_SCHEMA_FILES, null=True)
    product_name = models.CharField(max_length=255, blank=True, null=True, default='') 
    wholesale_price = models.CharField(max_length=255, blank=True, null=True, default='')
    retail_price = models.CharField(max_length=255, blank=True, null=True, default='')
    category = models.CharField(max_length=255, blank=True, null=True, default='')
    stocks_remaining = models.CharField(max_length=255, blank=True, null=True, default='')
    created_at = models.DateTimeField(auto_now_add=True)
  
    class Meta: 
        ordering = ('-created_at',)

    def created_at_formatted(self):
        return defaultfilters.date(self.created_at, 'M d, Y')
    
class FileUploadModel(models.Model):
    file = models.FileField(storage=S3Boto3Storage(), upload_to='delgar/products/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.file.name