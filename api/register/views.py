from rest_framework.response import Response
from rest_framework.views import APIView
from .forms import ConfirmReceiptForm, DonationForm, RegistrationForm
from .models import ConfirmReceiptModel, DonationModel, RegistrationModel
from .serializers import ConfirmReceiptSerializer, FileUploadSerializer, DonationSerializer, RegistrationSerializer
from rest_framework import generics, parsers, status
from django.template.loader import render_to_string
from django.core import mail
from django.utils.html import strip_tags
import json  # Add this import
# Create your views here.
class ConfirmReceiptViews(APIView):
  def post(self, request):
    form = ConfirmReceiptForm(request.data)
    
    # Safely extract preferred_topics directly from request.data
    preferred_topics = []
    if isinstance(request.data.get('preferred_topics'), list):
        preferred_topics = request.data.get('preferred_topics')
    elif isinstance(request.data.get('preferred_topics'), str):
        try:
            preferred_topics = json.loads(request.data.get('preferred_topics'))
        except json.JSONDecodeError:
            # If it's a string but not valid JSON, keep it empty
            pass
    
    context = {
      "team_member_id": request.data.get('team_member_id', ''),
      "fullname": request.data.get('fullname', ''),
      "birth_date": request.data.get('birth_date', ''),
      "contact_email": request.data.get('contact_email', ''),
      "contact_number": request.data.get('contact_number', ''),
      "tech_level": request.data.get('tech_level', ''),
      "preferred_topics": preferred_topics,
      "registration_fee": request.data.get('registration_fee', ''),
      "payment_method": request.data.get('payment_method', ''),
      "receipt_url": request.data.get('receipt_url', ''),
      "data_privacy_consent": request.data.get('data_privacy_consent', ''),
    }
    
    if form.is_valid():
      # Save the form data to the database
      try:
        form.save()
      except Exception as e:
        print(f"Error saving form: {e}")
      
      # Send the confirmation email
      subject = 'Welcome to TechSavvy Code Camp Season 3!'
      html_message = render_to_string('confirmation.html', context)
      plain_message = strip_tags(html_message)
      recipient = form.cleaned_data.get('contact_email')
      recipient_list = [recipient, 'jorenleeluna24@gmail.com']
      email_from = 'Tech Savvy Code Camp <noreply@techsavvies.space>'
      
      try:
        mail.send_mail(
          subject, 
          plain_message, 
          email_from, 
          recipient_list, 
          html_message=html_message, 
          fail_silently=False
        )
        return Response({'status': 'sent', 'message': 'Registration successful and confirmation email sent'})
      except Exception as e:
        print(f"Error sending email: {e}")
        return Response({
          'status': 'partial', 
          'message': 'Registration saved but email could not be sent',
          'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
      return Response({
        'status': 'error', 
        'message': 'Invalid form data', 
        'errors': form.errors
      }, status=status.HTTP_400_BAD_REQUEST)
    
class ConfirmDonationViews(APIView):
    def post(self, request):
        form = DonationForm(request.data)

        context = {
            "donation_id": request.data.get("donation_id", ""),
            "fullname": request.data.get("fullname", ""),
            "contact_email": request.data.get("contact_email", ""),
            "amount": request.data.get("amount", ""),
            "payment_method": request.data.get("payment_method", ""),
            "receipt_url": request.data.get("receipt_url", ""),
        }

        if form.is_valid():
            try:
                form.save()
            except Exception as e:
                print(f"Error saving form: {e}")

            subject = 'Thank You for Your Donation to TechSavvy Code Camp!'
            html_message = render_to_string('donation.html', context)
            plain_message = strip_tags(html_message)
            recipient = form.cleaned_data.get('contact_email')
            recipient_list = [recipient, 'jorenleeluna24@gmail.com']
            email_from = 'Tech Savvy Code Camp <noreply@techsavvies.space>'

            try:
                mail.send_mail(
                    subject,
                    plain_message,
                    email_from,
                    recipient_list,
                    html_message=html_message,
                    fail_silently=False
                )
                return Response({'status': 'sent', 'message': 'Donation recorded and confirmation email sent'})
            except Exception as e:
                print(f"Error sending email: {e}")
                return Response({
                    'status': 'partial',
                    'message': 'Donation recorded but email could not be sent',
                    'error': str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({
                'status': 'error',
                'message': 'Invalid form data',
                'errors': form.errors
            }, status=status.HTTP_400_BAD_REQUEST)

class ConfirmRegistrationViews(APIView):
    def post(self, request):
        form = RegistrationForm(data=request.data)

        if form.is_valid():
            try:
                registration = form.save()
            except Exception as e:
                print(f"Error saving form: {e}")
                return Response({
                    'status': 'error',
                    'message': 'Something went wrong while saving the registration.',
                    'error': str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Prepare email context
            context = {
                "registration_id": registration.registration_id,
                "fullname": registration.fullname,
                "contact_email": registration.contact_email,
                "contact_number": registration.contact_number,
                "payment_method": registration.payment_method,
                "base_amount": registration.base_amount,
                "member": registration.member,
                "add_ons": registration.add_ons or [],
                "receipt_url": registration.receipt_url,
                "created_at": registration.created_at_formatted()
            }

            subject = 'TECHSAVVY Code Camp Team Building Confirmation'
            html_message = render_to_string('registration.html', context)
            plain_message = strip_tags(html_message)
            recipient = registration.contact_email
            recipient_list = [recipient, 'jorenleeluna24@gmail.com']
            email_from = 'Tech Savvy Code Camp <noreply@techsavvies.space>'

            try:
                mail.send_mail(
                    subject,
                    plain_message,
                    email_from,
                    recipient_list,
                    html_message=html_message,
                    fail_silently=False
                )
                return Response({
                    'status': 'sent',
                    'message': 'Registration recorded and confirmation email sent.'
                })
            except Exception as e:
                print(f"Error sending email: {e}")
                return Response({
                    'status': 'partial',
                    'message': 'Registration recorded, but email could not be sent.',
                    'error': str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response({
                'status': 'error',
                'message': 'Invalid form data.',
                'errors': form.errors
            }, status=status.HTTP_400_BAD_REQUEST)
        
class ConfirmWebinarSeriesViews(APIView):
  def post(self, request):
    form = ConfirmReceiptForm(request.data)
    
    # Safely extract preferred_topics directly from request.data
    preferred_topics = []
    if isinstance(request.data.get('preferred_topics'), list):
        preferred_topics = request.data.get('preferred_topics')
    elif isinstance(request.data.get('preferred_topics'), str):
        try:
            preferred_topics = json.loads(request.data.get('preferred_topics'))
        except json.JSONDecodeError:
            # If it's a string but not valid JSON, keep it empty
            pass
    
    context = {
      "team_member_id": request.data.get('team_member_id', ''),
      "fullname": request.data.get('fullname', ''),
      "birth_date": request.data.get('birth_date', ''),
      "contact_email": request.data.get('contact_email', ''),
      "contact_number": request.data.get('contact_number', ''),
      "tech_level": request.data.get('tech_level', ''),
      "preferred_topics": preferred_topics,
      "registration_fee": request.data.get('registration_fee', ''),
      "payment_method": request.data.get('payment_method', ''),
      "receipt_url": request.data.get('receipt_url', ''),
      "data_privacy_consent": request.data.get('data_privacy_consent', ''),
    }
    
    if form.is_valid():
      # Save the form data to the database
      try:
        form.save()
      except Exception as e:
        print(f"Error saving form: {e}")
      
      # Send the confirmation email
      subject = 'Welcome to TechSavvy Code Camp Season 3!'
      html_message = render_to_string('webinar.html', context)
      plain_message = strip_tags(html_message)
      recipient = form.cleaned_data.get('contact_email')
      recipient_list = [recipient, 'jorenleeluna24@gmail.com']
      email_from = 'Tech Savvy Code Camp <noreply@techsavvies.space>'
      
      try:
        mail.send_mail(
          subject, 
          plain_message, 
          email_from, 
          recipient_list, 
          html_message=html_message, 
          fail_silently=False
        )
        return Response({'status': 'sent', 'message': 'Registration successful and confirmation email sent'})
      except Exception as e:
        print(f"Error sending email: {e}")
        return Response({
          'status': 'partial', 
          'message': 'Registration saved but email could not be sent',
          'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
      return Response({
        'status': 'error', 
        'message': 'Invalid form data', 
        'errors': form.errors
      }, status=status.HTTP_400_BAD_REQUEST)
    
class ListView(APIView):
  def get(self, request, format=None):
    obj = ConfirmReceiptModel.objects.all()
    serializer = ConfirmReceiptSerializer(obj, many=True)
    
    return Response(serializer.data)

class CreateView(APIView):
  def post(self, request):
    form = ConfirmReceiptForm(request.data)

    if form.is_valid():
      obj = form.save(commit=False)
      obj.save()

      return Response({'status':'created'})
    else:
      return Response({'status':'errors', 'errors': form.errors})
  
  def put(self, request, pk):
    obj = ConfirmReceiptModel.objects.get(pk=pk)
    form = ConfirmReceiptForm(request.data, instance=obj)
    form.save()

    return Response({'status': 'updated'})

  def delete(self, request, pk):
    obj = ConfirmReceiptModel.objects.get(pk=pk)
    obj.delete()

    return Response({'status': 'deleted'})
  
class DetailView(APIView):
  def get(self, request, pk, format=None):
    obj = ConfirmReceiptModel.objects.get(pk=pk)
    serializer = ConfirmReceiptSerializer(obj)

    return Response(serializer.data)
  
class ListDonationView(APIView):
  def get(self, request, format=None):
    obj = DonationModel.objects.all()
    serializer = DonationSerializer(obj, many=True)
    
    return Response(serializer.data)

class CreateDonationView(APIView):
  def post(self, request):
    form = DonationForm(request.data)

    if form.is_valid():
      obj = form.save(commit=False)
      obj.save()

      return Response({'status':'created'})
    else:
      return Response({'status':'errors', 'errors': form.errors})
  
  def put(self, request, pk):
    obj = DonationModel.objects.get(pk=pk)
    form = DonationForm(request.data, instance=obj)
    form.save()

    return Response({'status': 'updated'})

  def delete(self, request, pk):
    obj = DonationModel.objects.get(pk=pk)
    obj.delete()

    return Response({'status': 'deleted'})
  
class DetailDonationView(APIView):
  def get(self, request, pk, format=None):
    obj = DonationModel.objects.get(pk=pk)
    serializer = DonationSerializer(obj)

    return Response(serializer.data)
  
class ListRegistrationView(APIView):
  def get(self, request, format=None):
    obj = RegistrationModel.objects.all()
    serializer = RegistrationSerializer(obj, many=True)
    
    return Response(serializer.data)

class CreateRegistrationView(APIView):
  def post(self, request):
    form = RegistrationForm(request.data)

    if form.is_valid():
      obj = form.save(commit=False)
      obj.save()

      return Response({'status':'created'})
    else:
      return Response({'status':'errors', 'errors': form.errors})
  
  def put(self, request, pk):
    obj = RegistrationModel.objects.get(pk=pk)
    form = RegistrationForm(request.data, instance=obj)
    form.save()

    return Response({'status': 'updated'})

  def delete(self, request, pk):
    obj = RegistrationModel.objects.get(pk=pk)
    obj.delete()

    return Response({'status': 'deleted'})
  
class DetailRegistrationView(APIView):
  def get(self, request, pk, format=None):
    obj = RegistrationModel.objects.get(pk=pk)
    serializer = RegistrationSerializer(obj)

    return Response(serializer.data)
  
class FileUploadView(generics.GenericAPIView):
  parser_classes = (parsers.MultiPartParser,)
  serializer_class = FileUploadSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    if serializer.is_valid():
      uploaded_file = serializer.save()  # Save the file
      # Return the file URL that can be stored in receipt_url
      return Response({
        'file': uploaded_file.file.url,
        'message': 'File uploaded successfully'
      }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)