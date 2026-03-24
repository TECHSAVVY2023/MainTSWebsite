from rest_framework import serializers
import json

from .models import CmsItem, FileUploadModel, TechsavvyMembers


class CmsItemSerializer(serializers.ModelSerializer):
    def to_internal_value(self, data):
        normalized = data.copy() if hasattr(data, "copy") else dict(data)
        raw_filters = normalized.get("filters")
        if isinstance(raw_filters, dict):
            normalized["filters"] = json.dumps(raw_filters)
        return super().to_internal_value(normalized)

    def validate_filters(self, value):
        # Backward-compatible: allow object payloads for filters
        # while model still stores a CharField.
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
                # Keep legacy plain-string filters untouched.
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
