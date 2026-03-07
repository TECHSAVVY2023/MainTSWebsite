from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings


def send_contact_notification(contact):
    subject = "New Contact Request – Tech Savvy"

    html_content = render_to_string(
        "emails/contact_notification.html",
        {
            "name": contact.name,
            "email": contact.email,
            "business": contact.business or "—",
            "interest": contact.get_interest_display(),
            "billing": contact.get_billing_option_display(),
            "message": contact.message,
        }
    )

    email = EmailMultiAlternatives(
        subject=subject,
        body="You have received a new contact request.",
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[settings.ADMIN_NOTIFICATION_EMAIL],
    )

    email.attach_alternative(html_content, "text/html")
    email.send()


def send_contact_autoreply(contact):
    subject = "We received your request – Tech Savvy"

    html_content = render_to_string(
        "emails/contact_autoreply.html",
        {
            "name": contact.name,
        }
    )

    email = EmailMultiAlternatives(
        subject=subject,
        body="Thank you for contacting Tech Savvy.",
        from_email=settings.DEFAULT_FROM_EMAIL,
        to=[contact.email],
        reply_to=[settings.ADMIN_NOTIFICATION_EMAIL],
    )

    email.attach_alternative(html_content, "text/html")
    email.send()
