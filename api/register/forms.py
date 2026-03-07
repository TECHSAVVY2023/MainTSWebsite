from django import forms
from .models import ConfirmReceiptModel, FileUploadModel, DonationModel, RegistrationModel

class ConfirmReceiptForm(forms.ModelForm):
    class Meta:
        model = ConfirmReceiptModel
        fields = '__all__'

class FileUploadForm(forms.ModelForm):
    class Meta:
        model = FileUploadModel
        fields = ['file']

class DonationForm(forms.ModelForm):
    class Meta:
        model = DonationModel
        fields = '__all__'

class RegistrationForm(forms.ModelForm):
    class Meta:
        model = RegistrationModel
        fields = '__all__'
