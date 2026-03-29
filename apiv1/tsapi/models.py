from django.db import models


class CmsItem(models.Model):
    """
    Minimal CMS item model to back the Nuxt landing page.

    The frontend expects fields like:
    - id
    - title
    - descriptions
    - approval_status
    - links: array of strings
    - files: array of { name, url }
    - images: array of strings (URLs)
    - created_at: ISO date string
    """

    APPROVAL_PENDING = "pending"
    APPROVAL_APPROVED = "approved"
    APPROVAL_REJECTED = "rejected"

    APPROVAL_CHOICES = [
        (APPROVAL_PENDING, "Pending"),
        (APPROVAL_APPROVED, "Approved"),
        (APPROVAL_REJECTED, "Rejected"),
    ]

    content_id = models.CharField(max_length=255, blank=True, default="")
    title = models.CharField(max_length=255)
    authors = models.CharField(max_length=255, blank=True, default="")
    filters = models.CharField(max_length=255, blank=True, default="")
    descriptions = models.TextField(blank=True)
    approval_status = models.CharField(
        max_length=20, choices=APPROVAL_CHOICES, default=APPROVAL_PENDING
    )
    links = models.JSONField(default=list, blank=True)
    files = models.JSONField(default=list, blank=True)
    images = models.JSONField(default=list, blank=True)
    logs = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.title


class FileUploadModel(models.Model):
    """Local file upload for CMS attachments."""

    file = models.FileField(upload_to="techsavvy/newsfeed/")
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.file.name



class TechsavvyMembers(models.Model):
    """Member model for TechSavvy."""

    firstname = models.CharField(max_length=255, null=True, blank=True)
    middlename = models.CharField(max_length=255, null=True, blank=True)
    lastname = models.CharField(max_length=255, null=True, blank=True)
    birthdate = models.CharField(max_length=255, null=True, blank=True)
    role = models.CharField(max_length=255, null=True, blank=True)
    idNumber = models.CharField(max_length=255, unique=True)
    mobile = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    website = models.CharField(max_length=255, null=True, blank=True)
    gcashPoints = models.IntegerField(default=0)
    bonusPoints = models.IntegerField(default=0)
    voucherPoints = models.IntegerField(default=0)
    honorariumPoints = models.IntegerField(default=0)
    numberOfProjects = models.IntegerField(default=0)
    profilePicture = models.ImageField(upload_to="profiles/", null=True, blank=True)
    speaker_topic = models.CharField(
        max_length=500,
        blank=True,
        default="",
        help_text="Short line for community / speaker cards (e.g. talk focus).",
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return f"{self.firstname} {self.lastname} ({self.idNumber})"


class PaymongoWebhookEvent(models.Model):
    """
    Idempotent log of PayMongo webhook deliveries (data.id is unique per event).
    Inspect in admin or extend _handle_event_type to update orders.
    """

    paymongo_event_id = models.CharField(max_length=255, unique=True, db_index=True)
    event_type = models.CharField(max_length=120, db_index=True)
    livemode = models.BooleanField(default=False)
    payload = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self) -> str:
        return f"{self.event_type} ({self.paymongo_event_id})"


class MerchCheckoutOrder(models.Model):
    """Merch cart checkout — linked to PayMongo Checkout Session + webhooks."""

    STATUS_PENDING = "pending"
    STATUS_PAID = "paid"
    STATUS_FAILED = "failed"
    STATUS_CANCELLED = "cancelled"

    STATUS_CHOICES = [
        (STATUS_PENDING, "Pending"),
        (STATUS_PAID, "Paid"),
        (STATUS_FAILED, "Failed"),
        (STATUS_CANCELLED, "Cancelled"),
    ]

    reference_number = models.CharField(max_length=64, unique=True, db_index=True)
    checkout_session_id = models.CharField(max_length=80, blank=True, default="", db_index=True)
    status = models.CharField(
        max_length=20, choices=STATUS_CHOICES, default=STATUS_PENDING, db_index=True
    )
    lines_json = models.JSONField(default=list)
    shipping_snapshot = models.JSONField(default=dict, blank=True)
    total_centavos = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self) -> str:
        return f"{self.reference_number} ({self.status})"