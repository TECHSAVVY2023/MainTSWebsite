from rest_framework import serializers
from .models import TechsavvyModels


class TechsavvySerializer(serializers.ModelSerializer):
    class Meta:
        model = TechsavvyModels
        fields = "__all__"
        extra_kwargs = {
            "profilePicture": {"required": False},
        }

    def validate_idNumber(self, value):
        if not value:
            raise serializers.ValidationError("ID Number is required.")
        return value
