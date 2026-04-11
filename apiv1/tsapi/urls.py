
from django.urls import path

from . import views
from . import google_auth_views
from tsapi.merch import views as merch_views

urlpatterns = [
    path("calendar-events", views.calendar_events),
    path("cms/list/", views.CmsViewSet.as_view({"get": "list"}), name="cms_list"),
    path("cms/create/", views.CmsViewSet.as_view({"post": "create"}), name="cms_create"),
    path("cms/<int:pk>/", views.CmsViewSet.as_view({"get": "retrieve"}), name="cms_detail"),
    path("cms/edit/<int:pk>/", views.CmsViewSet.as_view({"put": "update", "patch": "update"}), name="cms_edit"),
    path("cms/delete/<int:pk>/", views.CmsViewSet.as_view({"delete": "destroy"}), name="cms_delete"),
    path("cms/upload/", views.FileUploadViewSet.as_view({"post": "upload"}), name="cms_upload"),
    path("auth/google/start/", google_auth_views.google_auth_start, name="google_oauth_start"),
    path("auth/google/callback/", google_auth_views.google_auth_callback, name="google_oauth_callback"),
    path("merch/checkout/", merch_views.create_checkout),
    path("payments/paymongo/create-checkout/", merch_views.create_checkout),
    path("webhooks/paymongo/", merch_views.paymongo_webhook),
    path("merch/order/<str:reference>/", merch_views.merch_order_status),
    path("payments/paymongo/order/<str:reference>/", merch_views.merch_order_status),
]
