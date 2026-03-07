# models.py
from django.db import models

class ContactRequest(models.Model):
    BILLING_CHOICES = [
        ("one-time", "One-time"),
        ("split", "Split (3 months)"),
    ]

    INTEREST_CHOICES = [
        ("website", "Website + Management"),
        ("social", "Social Media Management"),
        ("both", "Website + Social Media"),
    ]

    name = models.CharField(max_length=150)
    email = models.EmailField()
    business = models.CharField(max_length=255, blank=True)
    interest = models.CharField(max_length=20, choices=INTEREST_CHOICES)
    message = models.TextField()

    billing_option = models.CharField(
        max_length=20,
        choices=BILLING_CHOICES,
        default="one-time"
    )

    created_at = models.DateTimeField(auto_now_add=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    user_agent = models.TextField(blank=True)

    is_processed = models.BooleanField(default=False)

    class Meta:
        ordering = ["-created_at"]
        verbose_name = "Contact Request"
        verbose_name_plural = "Contact Requests"

    def __str__(self):
        return f"{self.name} – {self.email}"
