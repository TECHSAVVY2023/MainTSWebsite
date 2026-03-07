from rest_framework import serializers
from .models import OrderDetailsModel, ProductListModel, FileUploadModel

class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUploadModel
        fields = '__all__'

class OrderDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetailsModel
        fields = '__all__'

class ProductListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductListModel
        fields = '__all__'