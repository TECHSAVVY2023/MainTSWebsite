from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("tsapi", "0013_merchcheckoutorder_buyer_email"),
    ]

    operations = [
        migrations.AlterField(
            model_name="cmsitem",
            name="filters",
            field=models.TextField(blank=True, default=""),
        ),
    ]

