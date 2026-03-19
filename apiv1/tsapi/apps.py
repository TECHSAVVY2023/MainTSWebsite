from django.apps import AppConfig


class TsapiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "tsapi"

    def ready(self):
        import tsapi.signals  # noqa: F401
