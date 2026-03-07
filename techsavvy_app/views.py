from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import TechsavvyModels, DataPostingCMSModel
from .forms import TechsavvyForm, DataPostingCMSForm
from .serializers import TechsavvySerializer, DataPostingCMSSerializer, FileUploadSerializer
from rest_framework import generics, parsers, status

class DataPostingCMSListView(APIView):
    def get(self, request, format=None):
        obj = DataPostingCMSModel.objects.all()
        serializer = DataPostingCMSSerializer(obj, many=True)
        return Response(serializer.data)

class DataPostingCMSCreateView(APIView):
    def post(self, request):
        print("=== CREATE POST REQUEST ===")
        print("Request data:", request.data)

        serializer = DataPostingCMSSerializer(data=request.data)
        if serializer.is_valid():
            obj = serializer.save()
            print("Created object:", obj.id)
            return Response({
                'status': 'created',
                'id': obj.id,
                'data': DataPostingCMSSerializer(obj).data
            }, status=status.HTTP_201_CREATED)
        else:
            print("Validation errors:", serializer.errors)
            return Response({
                'status': 'error',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        print("=== UPDATE POST REQUEST ===")
        print("Request data:", request.data)

        try:
            obj = DataPostingCMSModel.objects.get(pk=pk)
        except DataPostingCMSModel.DoesNotExist:
            return Response({
                'status': 'error',
                'message': 'Post not found'
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = DataPostingCMSSerializer(obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 'updated',
                'data': serializer.data
            }, status=status.HTTP_200_OK)
        else:
            print("Validation errors:", serializer.errors)
            return Response({
                'status': 'error',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        try:
            obj = DataPostingCMSModel.objects.get(pk=pk)
            obj.delete()
            return Response({
                'status': 'deleted'
            }, status=status.HTTP_200_OK)
        except DataPostingCMSModel.DoesNotExist:
            return Response({
                'status': 'error',
                'message': 'Post not found'
            }, status=status.HTTP_404_NOT_FOUND)

class DataPostingCMSDetailView(APIView):
    def get(self, request, pk, format=None):
        obj = DataPostingCMSModel.objects.get(pk=pk)
        serializer = DataPostingCMSSerializer(obj)
        return Response(serializer.data)
class FileUploadView(generics.GenericAPIView):
    parser_classes = (parsers.MultiPartParser,)
    serializer_class = FileUploadSerializer

    def post(self, request, *args, **kwargs):
        # Handle multiple file uploads
        files = request.FILES.getlist('file')

        if not files:
            return Response(
                {'error': 'No files provided'},
                status=status.HTTP_400_BAD_REQUEST
            )

        uploaded_files = []
        errors = []

        for file in files:
            serializer = self.get_serializer(data={'file': file})
            if serializer.is_valid():
                uploaded_file = serializer.save()
                uploaded_files.append({
                    'name': file.name,
                    'url': uploaded_file.file.url
                })
            else:
                errors.append(f"File {file.name}: {serializer.errors}")

        response_data = {
            'uploaded_files': uploaded_files,
            'errors': errors,
            'total_uploaded': len(uploaded_files),
            'total_errors': len(errors)
        }

        if uploaded_files:
            return Response(response_data, status=status.HTTP_201_CREATED)
        else:
            return Response(response_data, status=status.HTTP_400_BAD_REQUEST)
