from django.db import migrations
from django_jsonform.models.fields import JSONField


def _parse_legacy_filters(value):
    if not value:
        return {}
    if isinstance(value, dict):
        return value

    text = str(value).strip()
    if not text:
        return {}

    # Support simple legacy format like "News, Highlights"
    parts = [part.strip() for part in text.split(",") if part.strip()]
    if not parts:
        return {}

    return {"category": parts[0], "legacy_tags": parts[1:]}


def forward_convert_filters(apps, schema_editor):
    DataPostingCMSModel = apps.get_model("techsavvy_app", "DataPostingCMSModel")
    for item in DataPostingCMSModel.objects.all().iterator():
        item.filters = _parse_legacy_filters(item.filters)
        item.save(update_fields=["filters"])


def reverse_convert_filters(apps, schema_editor):
    DataPostingCMSModel = apps.get_model("techsavvy_app", "DataPostingCMSModel")
    for item in DataPostingCMSModel.objects.all().iterator():
        filters = item.filters
        if isinstance(filters, dict):
            category = filters.get("category", "")
            legacy_tags = filters.get("legacy_tags", [])
            tags = ", ".join([category] + [str(tag) for tag in legacy_tags if tag])
            item.filters = tags
        else:
            item.filters = str(filters or "")
        item.save(update_fields=["filters"])


class Migration(migrations.Migration):

    dependencies = [
        ("techsavvy_app", "0006_datapostingcmsmodel_fileuploadmodel_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="datapostingcmsmodel",
            name="filters",
            field=JSONField(
                blank=True,
                default=dict,
                null=True,
                schema={
                    "type": "object",
                    "keys": {
                        "category": {"type": "string"},
                        "tagline": {"type": "string"},
                        "course_level": {"type": "string"},
                        "course_duration": {"type": "string"},
                        "course_type": {"type": "string"},
                        "project_client": {"type": "string"},
                        "project_status": {"type": "string"},
                        "project_year": {"type": "string"},
                        "technologies": {
                            "type": "array",
                            "items": {"type": "string"},
                        },
                    },
                },
            ),
        ),
        migrations.RunPython(forward_convert_filters, reverse_convert_filters),
    ]
