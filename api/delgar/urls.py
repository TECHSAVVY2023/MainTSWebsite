from django.urls import path

from . import views
from .views import FileUploadView


urlpatterns = [
    path('order/list/', views.OrderListView.as_view()),
    path('order/<int:pk>/', views.OrderDetailView.as_view()),
    path('order/delete/<int:pk>/', views.OrderCreateView.as_view()),
    path('order/edit/<int:pk>/', views.OrderCreateView.as_view()),
    path('order/create/', views.OrderCreateView.as_view()),
    path('product/list/', views.ProductListView.as_view()),
    path('product/<int:pk>/', views.ProductDetailView.as_view()),
    path('product/delete/<int:pk>/', views.ProductCreateView.as_view()),
    path('product/edit/<int:pk>/', views.ProductCreateView.as_view()),
    path('product/create/', views.ProductCreateView.as_view()),
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('thank-you-order/', views.ConfirmOrderViews.as_view()),
]