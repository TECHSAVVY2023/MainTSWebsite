from django.forms import ModelForm
from .models import EmailNotification

class EmailNotificationForm(ModelForm):
  class Meta:
    model = EmailNotification
    fields = '__all__'