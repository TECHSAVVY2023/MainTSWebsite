"""
Signals:
- Async email on member creation.
- Auto-delete uploaded files when a CmsItem is deleted.
"""
import os
import threading
from urllib.parse import urlparse

from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver
from django.template.loader import render_to_string
from email.utils import formataddr

from .models import CmsItem, FileUploadModel, TechsavvyMembers


def async_email_sender(subject, template_name, context, recipient, bcc=None):
    """Send email in a background thread so the request never hangs."""
    def task():
        try:
            html = render_to_string(template_name, context)
            from_email = formataddr(
                ("TechSavvy", getattr(settings, "DEFAULT_FROM_EMAIL", "noreply@localhost"))
            )
            msg = EmailMultiAlternatives(
                subject=subject,
                body="Please view this email in HTML format.",
                from_email=from_email,
                to=[recipient],
            )
            if bcc:
                msg.bcc = bcc
            msg.attach_alternative(html, "text/html")
            msg.send(fail_silently=False)
            print(f"[EMAIL SENT] {subject} → {recipient}")
        except Exception as e:
            print(f"[ASYNC EMAIL ERROR] {e}")

    threading.Thread(target=task, daemon=True).start()


def _url_to_filepath(url: str) -> str | None:
    """
    Convert a media URL like http://127.0.0.1:8000/media/techsavvy/newsfeed/img.jpg
    to its absolute filesystem path inside MEDIA_ROOT.
    Returns None if the URL doesn't look like a local media file.
    """
    try:
        media_url = settings.MEDIA_URL.rstrip("/")   # e.g. "/media"
        path = urlparse(url).path                    # e.g. "/media/techsavvy/newsfeed/img.jpg"
        if not path.startswith(media_url + "/"):
            return None
        relative = path[len(media_url) + 1:]        # e.g. "techsavvy/newsfeed/img.jpg"
        return os.path.join(settings.MEDIA_ROOT, relative)
    except Exception:
        return None


@receiver(post_delete, sender=CmsItem)
def cms_item_delete_files(sender, instance, **kwargs):
    """
    When a CmsItem is deleted, remove every uploaded file that was
    attached to it from the local media folder, and clean up any
    matching FileUploadModel records.
    """
    media_paths = set()

    # Collect from instance.files  →  [{"name": "...", "url": "http://..."}]
    if isinstance(instance.files, list):
        for entry in instance.files:
            url = entry.get("url", "") if isinstance(entry, dict) else str(entry)
            fp = _url_to_filepath(url)
            if fp:
                media_paths.add(fp)

    # Collect from instance.images  →  ["http://...", ...]
    if isinstance(instance.images, list):
        for url in instance.images:
            fp = _url_to_filepath(str(url))
            if fp:
                media_paths.add(fp)

    deleted_count = 0
    for path in media_paths:
        try:
            if os.path.isfile(path):
                os.remove(path)
                deleted_count += 1
                print(f"[FILE CLEANUP] Deleted: {path}")
            # Also remove the matching FileUploadModel record (if any)
            FileUploadModel.objects.filter(file=os.path.relpath(path, settings.MEDIA_ROOT)).delete()
        except Exception as e:
            print(f"[FILE CLEANUP ERROR] {path}: {e}")

    if deleted_count:
        print(f"[FILE CLEANUP] CmsItem #{instance.id} deleted — {deleted_count} file(s) removed from disk.")


@receiver(post_save, sender=TechsavvyMembers)
def member_created_welcome_email(sender, instance, created, **kwargs):
    """Send confirmation email only when a new member is created."""
    if not created or not instance.email:
        return
    if not getattr(settings, "DEFAULT_FROM_EMAIL", None):
        return

    context = {"member": instance, "year": __import__("datetime").datetime.now().year}
    bcc = [settings.ADMIN_NOTIFICATION_EMAIL] if getattr(settings, "ADMIN_NOTIFICATION_EMAIL", None) else None
    async_email_sender(
        subject="TechSavvy Membership Confirmation",
        template_name="ConfirmMembership.html",
        context=context,
        recipient=instance.email,
        bcc=bcc,
    )
