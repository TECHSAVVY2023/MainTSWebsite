from django.urls import path
from . import views
from .views import FileUploadView

urlpatterns = [
    # path('member/list/', views.TechsavvyListView.as_view()),
    # path('member/<int:pk>/', views.TechsavvyDetailView.as_view()),
    # path('member/delete/<int:pk>/', views.TechsavvyCreateView.as_view()),
    # path('member/edit/<int:pk>/', views.TechsavvyCreateView.as_view()),
    # path('member/create/', views.TechsavvyCreateView.as_view()),

    path('cms/list/', views.DataPostingCMSListView.as_view()),
    path('cms/<int:pk>/', views.DataPostingCMSDetailView.as_view()),
    path('cms/delete/<int:pk>/', views.DataPostingCMSCreateView.as_view()),
    path('cms/edit/<int:pk>/', views.DataPostingCMSCreateView.as_view()),
    path('cms/create/', views.DataPostingCMSCreateView.as_view()),
    path('cms/upload/', FileUploadView.as_view(), name='file-upload'),
]