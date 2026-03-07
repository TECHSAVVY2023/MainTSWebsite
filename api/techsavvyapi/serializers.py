# serializers.py
from rest_framework import serializers
from .models import ContactRequest


class ContactRequestSerializer(serializers.ModelSerializer):
    # Honeypot field (never saved)
    company = serializers.CharField(
        required=False,
        allow_blank=True,
        write_only=True
    )

    class Meta:
        model = ContactRequest
        fields = [
            "name",
            "email",
            "business",
            "interest",
            "billing_option",
            "message",
            "company",
        ]

    def validate(self, attrs):
        company = attrs.pop("company", "")

        if company:
            raise serializers.ValidationError("Spam detected.")

        return attrs

    def validate_message(self, value):
        value = value.strip()

        if len(value) < 20:
            raise serializers.ValidationError("Message too short.")

        if value.count("\n") > 20:
            raise serializers.ValidationError("Invalid formatting.")

        return value
