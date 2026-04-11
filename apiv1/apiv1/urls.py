from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from tsapi.merch import views as merch_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('landingPage.urls')),
    path('api/techsavvies/', include('tsapi.urls_api_techsavvies')),
    path("webhooks/paymongo/", merch_views.paymongo_webhook),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
