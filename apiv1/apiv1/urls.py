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
    path('api/delgar/', include('delgar_api.urls')),
    path('api/kathies/', include('kathieskitchen.urls')),
    path('api/techsavvy/', include('techsavvyapi.urls')),
    path('api/techsavvy/', include('tsapi.urls')),
    path('api/techsavvy_app/', include('techsavvy_app.urls')),
    path('api/techsavvy_members/', include('techsavvy_members.urls')),
    path('api/workflow/', include('Workflow.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.BASE_DIR / 'staticfiles')
