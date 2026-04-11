from django.urls import include, path

urlpatterns = [
    path("", include("tsapi.urls")),
    path("", include("tsapi.urls_members")),
]
