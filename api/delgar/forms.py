from django.forms import ModelForm
from .models import OrderDetailsModel, ProductListModel, FileUploadModel

class OrderDetailsForm(ModelForm):
  class Meta:
    model = OrderDetailsModel
    fields = '__all__'

class ProductListForm(ModelForm):
  class Meta:
    model = ProductListModel
    fields = '__all__'

class FileUploadForm(ModelForm):
  class Meta:
    model = FileUploadModel
    fields = '__all__'