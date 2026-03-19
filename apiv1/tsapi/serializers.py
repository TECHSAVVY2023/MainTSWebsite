from rest_framework import serializers

from .models import CmsItem, FileUploadModel, TechsavvyMembers


class CmsItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CmsItem
        fields = "__all__"


class FileUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = FileUploadModel
        fields = "__all__"


class TechsavvySerializer(serializers.ModelSerializer):
    class Meta:
        model = TechsavvyMembers
        fields = "__all__"
        extra_kwargs = {"profilePicture": {"required": False}}

    def validate_idNumber(self, value):
        if not value:
            raise serializers.ValidationError("ID Number is required.")
        return value
