from rest_framework.response import Response
from rest_framework.views import APIView
from .forms import ContactListForm, ItemListForm
from .models import ContactListModel, ItemListModel, DataPostingCMSModel
from .serializers import ContactListSerializer, ItemListSerializer,  DataPostingCMSSerializer, FileUploadSerializer
from rest_framework import generics, parsers, status
from django.template.loader import render_to_string
from django.core import mail
from django.utils.html import strip_tags
from django.core.mail import send_mail
import json  # Add this import
from django.core.mail import EmailMultiAlternatives
import traceback
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.db.models import Q
from rest_framework import generics, parsers, status

# Create your views here.

class ContactListView(APIView):
  def get(self, request, format=None):
    obj = ContactListModel.objects.all()
    serializer = ContactListSerializer(obj, many=True)
    
    return Response(serializer.data)

@method_decorator(csrf_exempt, name='dispatch')
class ContactCreateView(APIView):
  def post(self, request):
    form = ContactListForm(request.data)

    if form.is_valid():
      obj = form.save(commit=False)
      obj.save()

      return Response({'status':'created'})
    else:
      return Response({'status':'errors', 'errors': form.errors})
  
  def put(self, request, pk):
    obj = ContactListModel.objects.get(pk=pk)
    form = ContactListForm(request.data, instance=obj)
    form.save()

    return Response({'status': 'updated'})

  def delete(self, request, pk):
    obj = ContactListModel.objects.get(pk=pk)
    obj.delete()

    return Response({'status': 'deleted'})
  
class ContactDetailView(APIView):
  def get(self, request, pk, format=None):
    obj = ContactListModel.objects.get(pk=pk)
    serializer = ContactListSerializer(obj)

    return Response(serializer.data)
  
@method_decorator(csrf_exempt, name='dispatch')
class SubmitToGmail(APIView):
  def post(self, request):
    try:
      form = ContactListForm(request.data)

      if not form.is_valid():
        return Response({
          'status': 'error',
          'message': 'Invalid form data',
          'errors': form.errors
        }, status=status.HTTP_400_BAD_REQUEST)

      # Build context after validation
      context = {
        "contact_id": form.cleaned_data.get('contact_id'),
        "firstname": form.cleaned_data.get('firstname'),
        "lastname": form.cleaned_data.get('lastname'),
        "contact_email": form.cleaned_data.get('contact_email'),
        "contact_number": form.cleaned_data.get('contact_number'),
        "message": form.cleaned_data.get('message'),
      }

      firstname = form.cleaned_data.get('firstname')
      lastname = form.cleaned_data.get('lastname')
      recipient_email = form.cleaned_data.get('contact_email')

      # Subject lines
      subject_inquiry = f"Inquiry from {firstname} {lastname}"
      subject_thankyou = "Thank You for Contacting Fabrics Plus"

      # Render HTML templates
      html_message_inquiry = render_to_string('contact.html', context)
      plain_message_inquiry = strip_tags(html_message_inquiry)

      html_message_thankyou = render_to_string('thankyou.html', context)
      plain_message_thankyou = strip_tags(html_message_thankyou)

      # Internal team recipients
      internal_recipients = [
        'fabricplus05@gmail.com',
        'info@fabricspluscurtains.com',
        'fabrics_plus@yahoo.com'
      ]

      try:
        # Send inquiry email to team
        mail.send_mail(
          subject_inquiry,
          plain_message_inquiry,
          'info@fabricspluscurtains.com',  # Use proper from email
          internal_recipients,
          html_message=html_message_inquiry,
          fail_silently=False
        )

        # Send thank-you email to inquirer
        mail.send_mail(
          subject_thankyou,
          plain_message_thankyou,
          'Fabrics Plus <info@fabricspluscurtains.com>',  # Use proper from email
          [recipient_email],
          html_message=html_message_thankyou,
          fail_silently=False
        )

        return Response({'status': 'sent'}, status=status.HTTP_200_OK)

      except Exception as email_error:
        print(f"Email sending error: {email_error}")
        traceback.print_exc()
        return Response({
          'status': 'error',
          'message': 'Failed to send email notifications'
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    except Exception as e:
      print(f"General error in SubmitToGmail: {e}")
      traceback.print_exc()
      return Response({
        'status': 'error',
        'message': 'Internal server error'
      }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    


class ItemListView(APIView):
    def get(self, request, format=None):
        # Get query parameters for filtering
        category = request.GET.get('category', None)
        published_only = request.GET.get('published_only', 'true').lower() == 'true'

        # Build queryset
        queryset = ItemListModel.objects.all()

        if published_only:
            queryset = queryset.filter(is_published='yes')

        if category:
            queryset = queryset.filter(
                Q(category_name__icontains=category)
            )

        # Order by creation date (newest first)
        queryset = queryset.order_by('-created_at')

        serializer = ItemListSerializer(queryset, many=True)

        # Additional filtering can be done here if needed
        data = serializer.data

        # Filter out items with no valid images after .heic filtering
        filtered_data = []
        for item in data:
            if item.get('thumbnail') and len(item['thumbnail']) > 0:
                filtered_data.append(item)
            elif item.get('banner_image') and not item['banner_image'].lower().endswith('.heic'):
                filtered_data.append(item)

        return Response(filtered_data)
 
class ItemCreateView(APIView):
    def post(self, request):
        form = ItemListForm(request.data)

        if form.is_valid():
            form_input = form.save(commit=False)
            form_input.save()

            return Response({'status':'created'})
        else:
            return Response({'status':'errors', 'errors': form.errors})
  
    def put(self, request, pk):
        form_input = ItemListModel.objects.get(pk=pk)
        form = ItemListForm(request.data, instance=form_input)
        if form.is_valid():
            form.save()
            return Response({'status': 'updated'})
        else:
            return Response({'status': 'errors', 'errors': form.errors}, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        form_input = ItemListModel.objects.get(pk=pk)
        form_input.delete()

        return Response({'status': 'deleted'})

class ItemDetailView(APIView):
    def get(self, request, pk, format=None):
        obj = ItemListModel.objects.get(pk=pk)
        serializer = ItemListSerializer(obj)

        return Response(serializer.data)


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
            # Check file extension
            filename = file.name.lower()
            if filename.endswith('.heic'):
                errors.append(f"File {file.name}: HEIC format not supported")
                continue

            # Validate file size (max 10MB)
            if file.size > 10 * 1024 * 1024:
                errors.append(f"File {file.name}: File too large (max 10MB)")
                continue

            # Validate file type
            allowed_types = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
            if file.content_type not in allowed_types:
                errors.append(f"File {file.name}: Unsupported file type")
                continue

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