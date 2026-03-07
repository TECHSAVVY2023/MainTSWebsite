from rest_framework import serializers
from .models import DataPostingCMSModel, FileUploadModel, AECareersModel, AEFileUploadResumeModel

class DataPostingCMSSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataPostingCMSModel
        fields = '__all__'

class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUploadModel
        fields = '__all__'

class CareersSerializer(serializers.ModelSerializer):
    class Meta:
        model = AECareersModel
        fields = '__all__'

class FileUploadResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AEFileUploadResumeModel
        fields = '__all__'

