from django.urls import path

from . import views
from .views import FileUploadView


urlpatterns = [
    path('contact/list/', views.ContactListView.as_view()),
    path('contact/<int:pk>/', views.ContactDetailView.as_view()),
    path('contact/delete/<int:pk>/', views.ContactCreateView.as_view()),
    path('contact/edit/<int:pk>/', views.ContactCreateView.as_view()),
    path('contact/create/', views.ContactCreateView.as_view()),
    path('contact/gmail-notif/', views.SubmitToGmail.as_view()),
    
    path('items/create/', views.ItemCreateView.as_view()),
    path('items/list/', views.ItemListView.as_view()),
    path('items/<int:pk>/', views.ItemDetailView.as_view()),
    path('items/<int:pk>/delete/', views.ItemCreateView.as_view()),
    path('items/<int:pk>/edit/', views.ItemCreateView.as_view()),
    # path('items/upload/', FileUploadView.as_view(), name='file-upload'),

    path('cms/list/', views.DataPostingCMSListView.as_view()),
    path('cms/<int:pk>/', views.DataPostingCMSDetailView.as_view()),
    path('cms/delete/<int:pk>/', views.DataPostingCMSCreateView.as_view()),
    path('cms/edit/<int:pk>/', views.DataPostingCMSCreateView.as_view()),
    path('cms/create/', views.DataPostingCMSCreateView.as_view()),
    path('cms/upload/', FileUploadView.as_view(), name='file-upload'),
]