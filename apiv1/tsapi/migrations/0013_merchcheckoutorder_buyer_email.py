# Guest merch receipt emails — buyer_email + idempotency timestamp

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("tsapi", "0012_techsavvymembers_speaker_topic"),
    ]

    operations = [
        migrations.AddField(
            model_name="merchcheckoutorder",
            name="buyer_email",
            field=models.EmailField(blank=True, default="", max_length=254),
        ),
        migrations.AddField(
            model_name="merchcheckoutorder",
            name="receipt_email_sent_at",
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
