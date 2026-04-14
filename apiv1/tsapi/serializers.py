from rest_framework import serializers
import json

from .models import (
    CloudDriveFile,
    CloudDriveFolder,
    CmsItem,
    FileUploadModel,
    TechsavvyMembers,
)


class CmsItemSerializer(serializers.ModelSerializer):
    def to_internal_value(self, data):
        normalized = data.copy() if hasattr(data, "copy") else dict(data)
        raw_filters = normalized.get("filters")
        if isinstance(raw_filters, dict):
            normalized["filters"] = json.dumps(raw_filters)
        return super().to_internal_value(normalized)

    def validate_filters(self, value):
        if isinstance(value, dict):
            return json.dumps(value)
        return value

    def to_representation(self, instance):
        data = super().to_representation(instance)
        raw_filters = data.get("filters")
        if isinstance(raw_filters, str) and raw_filters.strip():
            try:
                data["filters"] = json.loads(raw_filters)
            except json.JSONDecodeError:
                pass
        return data

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


class CloudDriveFolderSerializer(serializers.ModelSerializer):
    files_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = CloudDriveFolder
        fields = ("id", "owner_email", "name", "created_at", "files_count")


class CloudDriveFileSerializer(serializers.ModelSerializer):
    folder_name = serializers.CharField(source="folder.name", read_only=True)
    url = serializers.SerializerMethodField()

    class Meta:
        model = CloudDriveFile
        fields = (
            "id",
            "owner_email",
            "folder",
            "folder_name",
            "original_name",
            "mime_type",
            "size_bytes",
            "created_at",
            "url",
        )

    def get_url(self, obj):
        request = self.context.get("request")
        if request:
            return request.build_absolute_uri(obj.file.url)
        return obj.file.url
