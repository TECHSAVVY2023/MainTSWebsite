from django.shortcuts import render
from django.views.generic import TemplateView

class HomePageView(TemplateView):
 template_name = 'index.html'

def home_page_view2(request):
 return render(request, 'index.html')