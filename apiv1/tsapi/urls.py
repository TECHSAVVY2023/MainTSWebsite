"""
CMS URLs – ViewSet actions wired to existing paths (dev-ui compatible).
Admin JWT auth under admin-api/ (boss-style).
"""
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views

urlpatterns = [
    # CMS (public + CRUD)
    path("cms/list/", views.CmsViewSet.as_view({"get": "list"}), name="cms_list"),
    path("cms/create/", views.CmsViewSet.as_view({"post": "create"}), name="cms_create"),
    path("cms/<int:pk>/", views.CmsViewSet.as_view({"get": "retrieve"}), name="cms_detail"),
    path("cms/edit/<int:pk>/", views.CmsViewSet.as_view({"put": "update", "patch": "update"}), name="cms_edit"),
    path("cms/delete/<int:pk>/", views.CmsViewSet.as_view({"delete": "destroy"}), name="cms_delete"),
    path("cms/upload/", views.FileUploadViewSet.as_view({"post": "upload"}), name="cms_upload"),
    # Admin JWT auth
    path("admin-api/login/", views.admin_login, name="admin-login"),
    path("admin-api/token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("admin-api/me/", views.admin_me, name="admin-me"),
    path("admin-api/logout/", views.admin_logout, name="admin-logout"),
]
