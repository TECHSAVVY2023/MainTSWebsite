from django.urls import path
from api.auth_views import google_auth, google_auth_callback

urlpatterns = [
    path('', google_auth, name='google_auth'),
    path('callback', google_auth_callback, name='google_auth_callback'),
    path('callback/', google_auth_callback, name='google_auth_callback_slash'),
]
