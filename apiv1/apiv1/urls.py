from django.contrib import admin
from django.urls import include, path
from django.conf import settings
from django.conf.urls.static import static
from tsapi import views as tsapi_views
from tsapi.merch import views as merch_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('landingPage.urls')),
    path('techsavvy_app/', include('tsapi.urls')),
    path('techsavvy_members/', include('tsapi.urls_members')),
    path('calendar-events', tsapi_views.calendar_events),
    # PayMongo dashboard → https://YOUR_NGROK_HOST/webhooks/paymongo/
    path("webhooks/paymongo/", merch_views.paymongo_webhook),
    path("", include("tsapi.urls")),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
