from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path("member/list/", views.TechsavvyListView.as_view(), name="member-list"),
    path("member/create/", views.TechsavvyCreateView.as_view(), name="member-create"),

    path("member/<int:pk>/", views.TechsavvyDetailView.as_view(), name="member-detail"),
    path("member/<int:pk>/update/", views.TechsavvyUpdateView.as_view(), name="member-update"),
    path("member/<int:pk>/delete/", views.TechsavvyDeleteView.as_view(), name="member-delete"),

    path("member/id/<str:idNumber>/", views.TechsavvyByIdNumberView.as_view(), name="member-by-id"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
