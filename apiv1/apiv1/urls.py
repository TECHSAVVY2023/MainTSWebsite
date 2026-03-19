from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("landingPage.urls")),
    # Backend for Nuxt dev-ui (CMS + Members)
    path("techsavvy_app/", include("tsapi.urls")),
    path("techsavvy_members/", include("tsapi.urls_members")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
