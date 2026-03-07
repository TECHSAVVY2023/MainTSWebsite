from datetime import timedelta

from django.utils import timezone
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions

from .models import ContactRequest
from .serializers import ContactRequestSerializer
from .emails import send_contact_notification, send_contact_autoreply


class ContactRequestAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get("email")

        if not email:
            return Response(
                {"success": False, "error": "Email is required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        #  Block same email within last 5 minutes
        five_minutes_ago = timezone.now() - timedelta(minutes=5)

        if ContactRequest.objects.filter(
            email=email,
            created_at__gte=five_minutes_ago
        ).exists():
            return Response(
                {
                    "success": False,
                    "error": "You have recently submitted a request. Please wait a few minutes before trying again."
                },
                status=status.HTTP_429_TOO_MANY_REQUESTS
            )

        serializer = ContactRequestSerializer(data=request.data)

        # Honeypot: if bot filled `company`, silently accept
        if not serializer.is_valid():
            if serializer.errors.get("company"):
                return Response({"success": True}, status=status.HTTP_201_CREATED)

            return Response(
                {"success": False, "errors": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Save contact
        contact = serializer.save(
            ip_address=self.get_client_ip(request),
            user_agent=request.headers.get("User-Agent", "")
        )

        # Send emails
        send_contact_notification(contact)
        send_contact_autoreply(contact)

        return Response(
            {"success": True, "message": "Request submitted successfully."},
            status=status.HTTP_201_CREATED
        )

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            return x_forwarded_for.split(",")[0]
        return request.META.get("REMOTE_ADDR")
