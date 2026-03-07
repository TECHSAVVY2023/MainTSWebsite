from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import generics, parsers, status
from .models import DataPostingCMSModel, AECareersModel
from .forms import DataPostingCMSForm
from .serializers import DataPostingCMSSerializer, FileUploadSerializer, CareersSerializer, FileUploadResumeSerializer
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.conf import settings

# Create your views here.

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

# Careers Views
class CareersListView(APIView):
    def get(self, request, format=None):
        obj = AECareersModel.objects.all()
        serializer = CareersSerializer(obj, many=True)
        return Response(serializer.data)

class CareersCreateView(APIView):
    def post(self, request):
        print("=== CREATE CAREER APPLICATION ===")
        print("Request data:", request.data)

        serializer = CareersSerializer(data=request.data)
        if serializer.is_valid():
            obj = serializer.save()
            print("Created application:", obj.id)

            # Send email notifications
            try:
                # Clean resume URLs by removing query parameters
                cleaned_resume = []
                if obj.resume:
                    for url in obj.resume:
                        # Find the file extension and remove everything after it
                        for ext in ['.pdf', '.doc', '.docx']:
                            if ext in url.lower():
                                cleaned_url = url.split(ext)[0] + ext
                                cleaned_resume.append(cleaned_url)
                                break
                        else:
                            # If no extension found, use original URL
                            cleaned_resume.append(url)

                context = {
                    'application_id': obj.application_id,
                    'fullname': obj.fullname,
                    'contact_email': obj.contact_email,
                    'contact_number': obj.contact_number,
                    'position_application': obj.position_application,
                    'years_of_experience': obj.years_of_experience,
                    'portfolio_url': obj.portfolio_url,
                    'tell_us_about_yourself_experience': obj.tell_us_about_yourself_experience,
                    'resume': cleaned_resume
                }

                # Send notification to company
                subject_company = f'New Career Application - {obj.fullname}'
                html_message_company = render_to_string('SubmissionReceived.html', context)

                from_email_formatted = f"Aptitude Entertainment Careers <{settings.EMAIL_HOST_USER}>"

                email_company = EmailMultiAlternatives(
                    subject=subject_company,
                    body=f"New career application from {obj.fullname} for {obj.position_application}",
                    from_email=from_email_formatted,
                    to=['info@aptitudeentertainment.com', 'info@techsavvies.space']
                )
                email_company.attach_alternative(html_message_company, "text/html")
                email_company.send()

                print("Company notification email sent successfully")

                # Send confirmation to applicant
                subject_applicant = 'Application Received - Aptitude Entertainment'
                html_message_applicant = render_to_string('ApplicationConfirmation.html', context)

                email_applicant = EmailMultiAlternatives(
                    subject=subject_applicant,
                    body=f"Thank you for your application for {obj.position_application}. We will get back to you as soon as possible.",
                    from_email=from_email_formatted,
                    to=[obj.contact_email],
                    reply_to=['info@aptitudeentertainment.com', 'info@techsavvies.space']
                )
                email_applicant.attach_alternative(html_message_applicant, "text/html")
                email_applicant.send()

                print("Applicant confirmation email sent successfully")
            except Exception as e:
                print(f"Error sending email: {str(e)}")
                # Don't fail the request if email fails

            return Response({
                'status': 'created',
                'id': obj.id,
                'data': CareersSerializer(obj).data
            }, status=status.HTTP_201_CREATED)
        else:
            print("Validation errors:", serializer.errors)
            return Response({
                'status': 'error',
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        print("=== UPDATE CAREER APPLICATION ===")
        print("Request data:", request.data)

        try:
            obj = AECareersModel.objects.get(pk=pk)
        except AECareersModel.DoesNotExist:
            return Response({
                'status': 'error',
                'message': 'Application not found'
            }, status=status.HTTP_404_NOT_FOUND)

        serializer = CareersSerializer(obj, data=request.data, partial=True)
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
            obj = AECareersModel.objects.get(pk=pk)
            obj.delete()
            return Response({
                'status': 'deleted'
            }, status=status.HTTP_200_OK)
        except AECareersModel.DoesNotExist:
            return Response({
                'status': 'error',
                'message': 'Application not found'
            }, status=status.HTTP_404_NOT_FOUND)

class CareersDetailView(APIView):
    def get(self, request, pk, format=None):
        obj = AECareersModel.objects.get(pk=pk)
        serializer = CareersSerializer(obj)
        return Response(serializer.data)

class CareersDeleteMultipleView(APIView):
    def post(self, request):
        ids = request.data.get('ids', [])
        if not ids:
            return Response({'error': 'No IDs provided'}, status=status.HTTP_400_BAD_REQUEST)

        deleted_count = AECareersModel.objects.filter(id__in=ids).delete()[0]
        return Response({'message': f'{deleted_count} applicants deleted successfully'}, status=status.HTTP_200_OK)

class FileUploadResumeView(generics.GenericAPIView):
    parser_classes = (parsers.MultiPartParser,)
    serializer_class = FileUploadResumeSerializer

    def post(self, request, *args, **kwargs):
        # Handle multiple resume uploads
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
