from django.urls import path
from . import views
from .views import FileUploadView, FileUploadResumeView

urlpatterns = [
    path('cms/list/', views.DataPostingCMSListView.as_view()),
    path('cms/<int:pk>/', views.DataPostingCMSDetailView.as_view()),
    path('cms/delete/<int:pk>/', views.DataPostingCMSCreateView.as_view()),
    path('cms/edit/<int:pk>/', views.DataPostingCMSCreateView.as_view()),
    path('cms/create/', views.DataPostingCMSCreateView.as_view()),
    path('cms/upload/', FileUploadView.as_view(), name='file-upload'),

    # Careers endpoints
    path('careers/list/', views.CareersListView.as_view()),
    path('careers/<int:pk>/', views.CareersDetailView.as_view()),
    path('careers/delete/<int:pk>/', views.CareersCreateView.as_view()),
    path('careers/delete-multiple/', views.CareersDeleteMultipleView.as_view()),
    path('careers/edit/<int:pk>/', views.CareersCreateView.as_view()),
    path('careers/create/', views.CareersCreateView.as_view()),
    path('careers/upload-resume/', FileUploadResumeView.as_view(), name='resume-upload'),
]

