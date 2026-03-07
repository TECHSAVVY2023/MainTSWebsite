from django.contrib import admin

# Register your models here.

from .models import OrderDetailsModel, ProductListModel, FileUploadModel

class ProductListModelAdmin(admin.ModelAdmin):
    list_display = ['product_id', 'product_image', 'product_name', 'wholesale_price', 'retail_price', 'category', 'stocks_remaining', 'created_at']

class OrderDetailsModelAdmin(admin.ModelAdmin):
    list_display = ['order_id', 'fullname', 'delivery_address', 'contact_email', 'contact_number', 'system_fee', 'delivery_fee', 'grand_total', 'payment_method', 'receipt_url', 'created_at', 'products']

admin.site.register(OrderDetailsModel, OrderDetailsModelAdmin)
admin.site.register(ProductListModel, ProductListModelAdmin)
admin.site.register(FileUploadModel)