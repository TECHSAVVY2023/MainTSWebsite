
from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from . import views
from tsapi.merch import views as merch_views

urlpatterns = [
    # CMS (public + CRUD)
    path("cms/list/", views.CmsViewSet.as_view({"get": "list"}), name="cms_list"),
    path("cms/create/", views.CmsViewSet.as_view({"post": "create"}), name="cms_create"),
    path("cms/<int:pk>/", views.CmsViewSet.as_view({"get": "retrieve"}), name="cms_detail"),
    path("cms/edit/<int:pk>/", views.CmsViewSet.as_view({"put": "update", "patch": "update"}), name="cms_edit"),
    path("cms/delete/<int:pk>/", views.CmsViewSet.as_view({"delete": "destroy"}), name="cms_delete"),
    path("cms/upload/", views.FileUploadViewSet.as_view({"post": "upload"}), name="cms_upload"),
    # Checkout
    path("merch/checkout/", merch_views.create_checkout),
    # Webhook
    path("webhooks/paymongo/", merch_views.paymongo_webhook),
    # Order status
    path("merch/order/<str:reference>/", merch_views.merch_order_status),
]
