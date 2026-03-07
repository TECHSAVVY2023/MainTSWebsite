from django.urls import path
from .views import ContactRequestAPIView

urlpatterns = [
    path("contact/", ContactRequestAPIView.as_view(), name="contact-request"),
]
