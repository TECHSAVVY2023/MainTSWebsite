from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('landingPage.urls')),
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
