from django.forms import ModelForm
from .models import TechsavvyModels


class TechsavvyForm(ModelForm):
    class Meta:
        model = TechsavvyModels
        fields = "__all__"
