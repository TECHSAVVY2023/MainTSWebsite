"""
ViewSets and auth (boss-style): public read-only, optional admin JWT.
Same URL paths kept for dev-ui compatibility.
"""
import json
import re

from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from .models import CloudDriveFile, CloudDriveFolder, CmsItem, FileUploadModel, TechsavvyMembers
from .serializers import (
    CloudDriveFileSerializer,
    CloudDriveFolderSerializer,
    CmsItemSerializer,
    FileUploadSerializer,
    TechsavvySerializer,
)


def _category_includes_events(cat_val) -> bool:
    s = str(cat_val or "").strip().lower()
    if not s:
        return False
    if s == "events":
        return True
    parts = re.split(r"[|,]", s)
    return any(p.strip() == "events" for p in parts)


def _cms_rows_for_calendar():
    """Approved CMS items whose filters JSON has category 'events' and event_date."""
    rows = []
    for item in CmsItem.objects.filter(approval_status=CmsItem.APPROVAL_APPROVED).order_by(
        "-created_at"
    ):
        raw = (item.filters or "").strip()
        if not raw:
            continue
        try:
            fl = json.loads(raw)
        except json.JSONDecodeError:
            continue
        if not isinstance(fl, dict):
            continue
        if not _category_includes_events(fl.get("category", "")):
            continue
        date_str = str(fl.get("event_date", "")).strip()
        if not date_str:
            continue
        iso = date_str if "T" in date_str else f"{date_str}T12:00:00.000Z"
        link = ""
        if isinstance(item.links, list) and item.links:
            link = str(item.links[0] or "")
        kind_raw = str(fl.get("event_kind", "event")).strip().lower()
        if kind_raw not in ("task", "reminder", "appointment", "event"):
            kind_raw = "event"
        rows.append(
            {
                "id": str(item.pk),
                "title": item.title or "Event",
                "date": iso,
                "time": str(fl.get("event_time", "")).strip(),
                "end_time": str(fl.get("end_time", "")).strip(),
                "description": (item.descriptions or "")[:2000],
                "link": link,
                "kind": kind_raw,
            }
        )
    rows.sort(key=lambda r: r["date"])
    return rows


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def calendar_events(request):
    """
    Calendar feed for Nuxt landing / dashboard.
    GET: approved CMS rows with filters.category=events and event_date set.
    POST: legacy stub shape (dashboard create); not persisted here.
    """
    if request.method == "POST":
        return Response(
            {"id": "1", "title": "", "date": "", "time": "", "description": "", "link": ""}
        )
    return Response(_cms_rows_for_calendar())


class CmsViewSet(ModelViewSet):
    """
    CMS items: list, retrieve, create, update, destroy.
    Boss-style ViewSet; URLs are wired manually to keep dev-ui paths.
    """
    queryset = CmsItem.objects.all().order_by("-created_at")
    serializer_class = CmsItemSerializer
    permission_classes = [AllowAny]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context["request"] = self.request
        return context

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        obj = serializer.save()
        return Response(
            {"status": "created", "id": obj.id, "data": CmsItemSerializer(obj).data},
            status=status.HTTP_201_CREATED,
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"status": "updated", "data": serializer.data})

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response({"status": "deleted"})


class FileUploadViewSet(ModelViewSet):
    """Upload only: single custom action used at cms/upload/."""
    queryset = FileUploadModel.objects.none()
    serializer_class = FileUploadSerializer
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser)

    def upload(self, request):
        files = request.FILES.getlist("file")
        if not files:
            return Response(
                {"error": "No files provided"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        uploaded_files = []
        for file in files:
            serializer = FileUploadSerializer(data={"file": file})
            if serializer.is_valid():
                uploaded = serializer.save()
                url = request.build_absolute_uri(uploaded.file.url)
                uploaded_files.append({"name": file.name, "url": url})
        return Response(
            {"uploaded_files": uploaded_files, "total_uploaded": len(uploaded_files)},
            status=status.HTTP_201_CREATED,
        )


@method_decorator(csrf_exempt, name="dispatch")
class MemberViewSet(ModelViewSet):
    queryset = TechsavvyMembers.objects.all().order_by("-created_at")
    serializer_class = TechsavvySerializer
    permission_classes = [AllowAny]
    parser_classes = (MultiPartParser, FormParser)

    def get_queryset(self):
        qs = super().get_queryset()
        id_number = self.kwargs.get("idNumber")
        if id_number is not None:
            return qs.filter(idNumber=id_number)
        return qs

    def get_object(self):
        if "idNumber" in self.kwargs:
            return self.get_queryset().get()
        return super().get_object()

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        member = serializer.save()
        return Response(
            {"success": True, "message": "Member created successfully", "data": serializer.data},
            status=status.HTTP_201_CREATED,
        )

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop("partial", True)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.delete()
        return Response(
            {"success": True, "message": "Member deleted successfully"},
            status=status.HTTP_200_OK,
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def admin_login(request):
    """Issue JWT tokens for staff users only."""
    from django.contrib.auth import authenticate
    from rest_framework_simplejwt.tokens import RefreshToken

    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(request, username=username, password=password)
    if not user or not user.is_staff:
        return Response({"error": "Invalid credentials"}, status=status.HTTP_403_FORBIDDEN)
    refresh = RefreshToken.for_user(user)
    return Response({
        "refresh": str(refresh),
        "access": str(refresh.access_token),
        "user": {"username": user.username, "email": getattr(user, "email", "")},
    })


@api_view(["GET"])
@permission_classes([IsAdminUser])
def admin_me(request):
    """Return current admin user (requires JWT)."""
    user = request.user
    return Response({"username": user.username, "email": getattr(user, "email", "")})


@api_view(["POST"])
@permission_classes([IsAdminUser])
def admin_logout(request):
    """Client should clear tokens; optional blacklist can be added."""
    return Response({"message": "Logged out (client should clear tokens)."})


def _normalize_owner_email(request):
    raw = (
        request.query_params.get("owner_email")
        or request.data.get("owner_email")
        or ""
    )
    return str(raw).strip().lower()


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def drive_folders(request):
    owner_email = _normalize_owner_email(request)
    if not owner_email:
        return Response({"detail": "owner_email is required."}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "GET":
        rows = CloudDriveFolder.objects.filter(owner_email=owner_email).order_by("name")
        payload = []
        for folder in rows:
            payload.append({
                "id": folder.id,
                "owner_email": folder.owner_email,
                "name": folder.name,
                "created_at": folder.created_at,
                "files_count": folder.files.count(),
            })
        return Response(payload)

    name = str(request.data.get("name") or "").strip()
    if not name:
        return Response({"detail": "Folder name is required."}, status=status.HTTP_400_BAD_REQUEST)

    exists = CloudDriveFolder.objects.filter(owner_email=owner_email, name__iexact=name).first()
    if exists:
        serializer = CloudDriveFolderSerializer(exists)
        return Response(serializer.data, status=status.HTTP_200_OK)

    folder = CloudDriveFolder.objects.create(owner_email=owner_email, name=name)
    return Response(CloudDriveFolderSerializer(folder).data, status=status.HTTP_201_CREATED)


@api_view(["DELETE"])
@permission_classes([AllowAny])
def drive_folder_delete(request, pk: int):
    owner_email = _normalize_owner_email(request)
    if not owner_email:
        return Response({"detail": "owner_email is required."}, status=status.HTTP_400_BAD_REQUEST)

    folder = CloudDriveFolder.objects.filter(pk=pk, owner_email=owner_email).first()
    if not folder:
        return Response({"detail": "Folder not found."}, status=status.HTTP_404_NOT_FOUND)

    if folder.files.exists():
        return Response(
            {"detail": "Folder is not empty. Delete files first."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    folder.delete()
    return Response({"success": True})


@api_view(["GET", "POST"])
@permission_classes([AllowAny])
def drive_files(request):
    owner_email = _normalize_owner_email(request)
    if not owner_email:
        return Response({"detail": "owner_email is required."}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == "GET":
        qs = CloudDriveFile.objects.filter(owner_email=owner_email).select_related("folder")
        folder_id = request.query_params.get("folder_id")
        if folder_id:
            qs = qs.filter(folder_id=folder_id)
        q = str(request.query_params.get("q") or "").strip()
        if q:
            qs = qs.filter(original_name__icontains=q)
        rows = qs.order_by("-created_at")
        serializer = CloudDriveFileSerializer(rows, many=True, context={"request": request})
        return Response(serializer.data)

    files = request.FILES.getlist("files")
    if not files:
        return Response({"detail": "No files provided."}, status=status.HTTP_400_BAD_REQUEST)

    folder = None
    folder_id = request.data.get("folder_id")
    if folder_id:
        folder = CloudDriveFolder.objects.filter(pk=folder_id, owner_email=owner_email).first()
        if not folder:
            return Response({"detail": "Folder not found."}, status=status.HTTP_404_NOT_FOUND)

    created = []
    for f in files:
        row = CloudDriveFile.objects.create(
            owner_email=owner_email,
            folder=folder,
            file=f,
            original_name=f.name,
            mime_type=getattr(f, "content_type", "") or "",
            size_bytes=int(getattr(f, "size", 0) or 0),
        )
        created.append(row)
    serializer = CloudDriveFileSerializer(created, many=True, context={"request": request})
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["DELETE"])
@permission_classes([AllowAny])
def drive_file_delete(request, pk: int):
    owner_email = _normalize_owner_email(request)
    if not owner_email:
        return Response({"detail": "owner_email is required."}, status=status.HTTP_400_BAD_REQUEST)

    row = CloudDriveFile.objects.filter(pk=pk, owner_email=owner_email).first()
    if not row:
        return Response({"detail": "File not found."}, status=status.HTTP_404_NOT_FOUND)
    row.file.delete(save=False)
    row.delete()
    return Response({"success": True})
