from rest_framework import serializers
from .models import ConfirmReceiptModel, FileUploadModel, DonationModel, RegistrationModel

class ConfirmReceiptSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConfirmReceiptModel
        fields = '__all__'

class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUploadModel
        fields = '__all__'

class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DonationModel
        fields = '__all__'

class RegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegistrationModel
        fields = '__all__'