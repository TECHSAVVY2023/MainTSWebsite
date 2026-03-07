from django.urls import path

from . import views
from .views import FileUploadView


urlpatterns = [
    path('list/', views.ListView.as_view()),
    path('<int:pk>/', views.DetailView.as_view()),
    path('delete/<int:pk>/', views.CreateView.as_view()),
    path('edit/<int:pk>/', views.CreateView.as_view()),
    path('create/', views.CreateView.as_view()),
    path('donation/list/', views.ListDonationView.as_view()),
    path('donation/<int:pk>/', views.DetailDonationView.as_view()),
    path('donation/delete/<int:pk>/', views.CreateDonationView.as_view()),
    path('donation/edit/<int:pk>/', views.CreateDonationView.as_view()),
    path('donation/create/', views.CreateDonationView.as_view()),
    path('registration/list/', views.ListRegistrationView.as_view()),
    path('registration/<int:pk>/', views.DetailRegistrationView.as_view()),
    path('registration/delete/<int:pk>/', views.CreateRegistrationView.as_view()),
    path('registration/edit/<int:pk>/', views.CreateRegistrationView.as_view()),
    path('registration/create/', views.CreateDonationView.as_view()),
    path('upload/', FileUploadView.as_view(), name='file-upload'),
    path('email/', views.ConfirmReceiptViews.as_view()),
    path('webinar-series/', views.ConfirmWebinarSeriesViews.as_view()),
    path('thank-you-donation/', views.ConfirmDonationViews.as_view()),
    path('thank-you-registration/', views.ConfirmRegistrationViews.as_view()),
]