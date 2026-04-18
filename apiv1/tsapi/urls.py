
from django.urls import path

from . import views
from tsapi.merch import views as merch_views

urlpatterns = [
    path("calendar-events", views.calendar_events),
    path("member/list/", views.MemberViewSet.as_view({"get": "list"}), name="member-list"),
    path("member/create/", views.MemberViewSet.as_view({"post": "create"}), name="member-create"),
    path("member/<int:pk>/", views.MemberViewSet.as_view({"get": "retrieve"}), name="member-detail"),
    path("member/<int:pk>/update/", views.MemberViewSet.as_view({"put": "update", "patch": "update"}), name="member-update"),
    path("member/<int:pk>/delete/", views.MemberViewSet.as_view({"delete": "destroy"}), name="member-delete"),
    path("member/id/<str:idNumber>/", views.MemberViewSet.as_view({"get": "retrieve"}), name="member-by-id"),
    path("cms/list/", views.CmsViewSet.as_view({"get": "list"}), name="cms_list"),
    path("cms/create/", views.CmsViewSet.as_view({"post": "create"}), name="cms_create"),
    path("cms/<int:pk>/", views.CmsViewSet.as_view({"get": "retrieve"}), name="cms_detail"),
    path("cms/edit/<int:pk>/", views.CmsViewSet.as_view({"put": "update", "patch": "update"}), name="cms_edit"),
    path("cms/delete/<int:pk>/", views.CmsViewSet.as_view({"delete": "destroy"}), name="cms_delete"),
    path("cms/upload/", views.FileUploadViewSet.as_view({"post": "upload"}), name="cms_upload"),
    path("drive/folders/", views.drive_folders, name="drive_folders"),
    path("drive/folders/<int:pk>/", views.drive_folder_delete, name="drive_folder_delete"),
    path("drive/files/", views.drive_files, name="drive_files"),
    path("drive/files/<int:pk>/", views.drive_file_delete, name="drive_file_delete"),
    path("auth/google/start/", views.google_auth_start, name="google_oauth_start"),
    path("auth/callback/", views.google_auth_callback, name="oauth_callback"),
    path("merch/checkout/", merch_views.create_checkout),
    path("payments/paymongo/create-checkout/", merch_views.create_checkout),
    path("webhooks/paymongo/", merch_views.paymongo_webhook),
    path("merch/order/<str:reference>/", merch_views.merch_order_status),
    path("payments/paymongo/order/<str:reference>/", merch_views.merch_order_status),
]
