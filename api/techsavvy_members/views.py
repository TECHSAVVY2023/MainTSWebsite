from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from .models import TechsavvyModels
from .serializers import TechsavvySerializer


# ✅ CREATE (with email notification)
class TechsavvyCreateView(generics.CreateAPIView):
    queryset = TechsavvyModels.objects.all()
    serializer_class = TechsavvySerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        if not serializer.is_valid():
            return Response({
                "success": False,
                "message": "Validation error",
                "errors": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        member = serializer.save()

        # 📧 Email notification
        if member.email:
            try:
                context = {"member": member}

                html_content = render_to_string(
                    "ConfirmMembership.html",
                    context
                )

                email = EmailMultiAlternatives(
                    subject="TechSavvy Membership Confirmation",
                    body="Your TechSavvy membership has been confirmed.",
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    to=[member.email],
                    bcc=[settings.ADMIN_NOTIFICATION_EMAIL],
                )
                email.attach_alternative(html_content, "text/html")
                email.send()

            except Exception as e:
                # ❗ Email failure must NOT break API
                print("Email sending error:", e)

        return Response({
            "success": True,
            "message": "Member created successfully",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)


# ✅ LIST
class TechsavvyListView(generics.ListAPIView):
    queryset = TechsavvyModels.objects.all()
    serializer_class = TechsavvySerializer


# ✅ RETRIEVE BY PK
class TechsavvyDetailView(generics.RetrieveAPIView):
    queryset = TechsavvyModels.objects.all()
    serializer_class = TechsavvySerializer


# ✅ RETRIEVE BY ID NUMBER
class TechsavvyByIdNumberView(generics.RetrieveAPIView):
    serializer_class = TechsavvySerializer
    lookup_field = "idNumber"

    def get_queryset(self):
        return TechsavvyModels.objects.all()


# ✅ UPDATE
class TechsavvyUpdateView(generics.UpdateAPIView):
    queryset = TechsavvyModels.objects.all()
    serializer_class = TechsavvySerializer
    parser_classes = (MultiPartParser, FormParser)


# ✅ DELETE
class TechsavvyDeleteView(generics.DestroyAPIView):
    queryset = TechsavvyModels.objects.all()
    serializer_class = TechsavvySerializer

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({
            "success": True,
            "message": "Member deleted successfully"
        }, status=status.HTTP_200_OK)
