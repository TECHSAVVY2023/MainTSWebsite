from django.forms import ModelForm
from .models import ContactListModel, ItemListModel,  DataPostingCMSModel, FileUploadModel

class ContactListForm(ModelForm):
  class Meta:
    model = ContactListModel
    fields = '__all__'

class ItemListForm(ModelForm):
    class Meta:
        model = ItemListModel
        fields = '__all__'

class DataPostingCMSForm(ModelForm):
    class Meta:
        model = DataPostingCMSModel
        fields = '__all__'

class FileUploadForm(ModelForm):
    class Meta:
        model = FileUploadModel
        fields = '__all__'

