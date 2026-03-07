from django.urls import path
from . import views

urlpatterns = [
    path('to-gmail-pending/', views.SubmitAppointmentToGmailPending.as_view()),
    path('to-gmail-declined/', views.SubmitAppointmentToGmailDeclined.as_view()),
    path('to-gmail-approved/', views.SubmitAppointmentToGmailApproved.as_view()),
    path('to-gmail-for-revision/', views.SubmitAppointmentToGmailForRevision.as_view()),
]