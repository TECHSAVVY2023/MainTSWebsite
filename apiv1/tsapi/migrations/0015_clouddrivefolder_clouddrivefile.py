from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("tsapi", "0014_alter_cmsitem_filters"),
    ]

    operations = [
        migrations.CreateModel(
            name="CloudDriveFolder",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("owner_email", models.EmailField(db_index=True, max_length=254)),
                ("name", models.CharField(max_length=120)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
            ],
            options={
                "ordering": ("name", "-created_at"),
                "unique_together": {("owner_email", "name")},
            },
        ),
        migrations.CreateModel(
            name="CloudDriveFile",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("owner_email", models.EmailField(db_index=True, max_length=254)),
                ("file", models.FileField(upload_to="techsavvy/drive/")),
                ("original_name", models.CharField(max_length=255)),
                ("mime_type", models.CharField(blank=True, default="", max_length=120)),
                ("size_bytes", models.BigIntegerField(default=0)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                (
                    "folder",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.SET_NULL,
                        related_name="files",
                        to="tsapi.clouddrivefolder",
                    ),
                ),
            ],
            options={
                "ordering": ("-created_at",),
            },
        ),
    ]
