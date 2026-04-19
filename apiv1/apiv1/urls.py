from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from tsapi import views as tsapi_views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('landingPage.urls')),
    path('api/auth/', tsapi_views.central_google_auth_start, name='central_google_auth'),
    path('api/auth/callback', tsapi_views.central_google_auth_callback, name='central_google_auth_callback'),
    path('api/techsavvy/', include('tsapi.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.BASE_DIR / 'staticfiles')
