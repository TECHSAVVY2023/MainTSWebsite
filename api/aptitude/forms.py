from django.forms import ModelForm
from .models import DataPostingCMSModel, FileUploadModel, AECareersModel, AEFileUploadResumeModel

class DataPostingCMSForm(ModelForm):
    class Meta:
        model = DataPostingCMSModel
        fields = '__all__'

class FileUploadForm(ModelForm):
    class Meta:
        model = FileUploadModel
        fields = '__all__'

class AECareersForm(ModelForm):
    class Meta:
        model = AECareersModel
        fields = '__all__'

class AEFileUploadResumeForm(ModelForm):
    class Meta:
        model = AEFileUploadResumeModel
        fields = '__all__'

