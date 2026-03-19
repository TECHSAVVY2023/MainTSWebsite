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
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return f"{self.firstname} {self.lastname} ({self.idNumber})"