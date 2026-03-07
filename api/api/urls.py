from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from django.urls import re_path
from django.conf.urls.static import static
# from django.views.static import serve

urlpatterns = [
    # path('api/', include('djoser.urls')),
    # path('api/', include('djoser.urls.authtoken')),
    re_path('', include('landingPage.urls')),
    path('admin/', admin.site.urls),
    path('api/email-notification/', include('email_notification.urls')),
    path('api/register/', include('register.urls')),
    path('api/delgar/', include('delgar.urls')),
    path('api/fabricsplus/', include('fabricsplus.urls')),
    path('api/techsavvyapi/', include('techsavvyapi.urls')),
    path('api/techsavvy_members/', include('techsavvy_members.urls')),
    path('api/techsavvy_app/', include('techsavvy_app.urls')),
    path('api/aptitude/', include('aptitude.urls')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)