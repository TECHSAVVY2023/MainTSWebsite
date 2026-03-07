from django.db import models
from django.template import defaultfilters


class TechsavvyModels(models.Model):
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
    profilePicture = models.ImageField(
        upload_to="profiles/",
        null=True,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("-created_at",)

    def created_at_formatted(self):
        return defaultfilters.date(self.created_at, "M d, Y")

    def __str__(self):
        return f"{self.firstname} {self.lastname} ({self.idNumber})"
