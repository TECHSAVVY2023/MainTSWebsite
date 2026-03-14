# Create your views here.
from django.shortcuts import render, redirect
from django.http import JsonResponse
from rest_framework import viewsets
from .models import Product
from .serializers import ProductSerializer


# Create your views here.

def product_list(request):
    if request.method == 'POST':
        name = request.POST.get('name')
        price = request.POST.get('price')
        description = request.POST.get('description')
        if name and price:
            Product.objects.create(name=name, price=price, description=description or '')
            return redirect('product_list')
    
    products = Product.objects.all()
    return render(request, 'myapp/product_list.html', {'products': products})

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer