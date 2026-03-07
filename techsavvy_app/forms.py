from django.forms import ModelForm
from .models import TechsavvyModels, DataPostingCMSModel, FileUploadModel

class TechsavvyForm(ModelForm):
    class Meta:
        model = TechsavvyModels
        fields = '__all__'

class DataPostingCMSForm(ModelForm):
    class Meta:
        model = DataPostingCMSModel
        fields = '__all__'

class FileUploadForm(ModelForm):
    class Meta:
        model = FileUploadModel
        fields = '__all__'