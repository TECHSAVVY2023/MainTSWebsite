from rest_framework import serializers
from .models import TechsavvyModels, DataPostingCMSModel, FileUploadModel


class TechsavvySerializer(serializers.ModelSerializer):
    class Meta:
        model = TechsavvyModels
        fields = '__all__'

class DataPostingCMSSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataPostingCMSModel
        fields = '__all__'

class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUploadModel
        fields = '__all__'