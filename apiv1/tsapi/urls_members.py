"""
Member URLs – ViewSet actions (boss-style), same paths for dev-ui.
"""
from django.urls import path

from . import views

urlpatterns = [
    path("member/list/", views.MemberViewSet.as_view({"get": "list"}), name="member-list"),
    path("member/create/", views.MemberViewSet.as_view({"post": "create"}), name="member-create"),
    path("member/<int:pk>/", views.MemberViewSet.as_view({"get": "retrieve"}), name="member-detail"),
    path("member/<int:pk>/update/", views.MemberViewSet.as_view({"put": "update", "patch": "update"}), name="member-update"),
    path("member/<int:pk>/delete/", views.MemberViewSet.as_view({"delete": "destroy"}), name="member-delete"),
    path("member/id/<str:idNumber>/", views.MemberViewSet.as_view({"get": "retrieve"}), name="member-by-id"),
]
