from rest_framework.response import Response
from rest_framework.views import APIView
from .forms import OrderDetailsForm, ProductListForm
from .models import OrderDetailsModel, ProductListModel
from .serializers import FileUploadSerializer, OrderDetailsSerializer, ProductListSerializer
from rest_framework import generics, parsers, status
from django.template.loader import render_to_string
from django.core import mail
from django.utils.html import strip_tags
from django.core.mail import send_mail
import json  # Add this import
from django.core.mail import EmailMultiAlternatives
import traceback

# Create your views here.

class OrderListView(APIView):
  def get(self, request, format=None):
    obj = OrderDetailsModel.objects.all()
    serializer = OrderDetailsSerializer(obj, many=True)
    
    return Response(serializer.data)

class OrderCreateView(APIView):
  def post(self, request):
    form = OrderDetailsForm(request.data)

    if form.is_valid():
      obj = form.save(commit=False)
      obj.save()

      return Response({'status':'created'})
    else:
      return Response({'status':'errors', 'errors': form.errors})
  
  def put(self, request, pk):
    obj = OrderDetailsModel.objects.get(pk=pk)
    form = OrderDetailsForm(request.data, instance=obj)
    form.save()

    return Response({'status': 'updated'})

  def delete(self, request, pk):
    obj = OrderDetailsModel.objects.get(pk=pk)
    obj.delete()

    return Response({'status': 'deleted'})
  
class OrderDetailView(APIView):
  def get(self, request, pk, format=None):
    obj = OrderDetailsModel.objects.get(pk=pk)
    serializer = OrderDetailsSerializer(obj)

    return Response(serializer.data)
  
class ProductListView(APIView):
  def get(self, request, format=None):
    obj = ProductListModel.objects.all()
    serializer = ProductListSerializer(obj, many=True)
    
    return Response(serializer.data)

class ProductCreateView(APIView):
  def post(self, request):
    form = ProductListForm(request.data)

    if form.is_valid():
      obj = form.save(commit=False)
      obj.save()

      return Response({'status':'created'})
    else:
      return Response({'status':'errors', 'errors': form.errors})
  
  def put(self, request, pk):
    obj = ProductListModel.objects.get(pk=pk)
    form = ProductListForm(request.data, instance=obj)
    form.save()

    return Response({'status': 'updated'})

  def delete(self, request, pk):
    obj = ProductListModel.objects.get(pk=pk)
    obj.delete()

    return Response({'status': 'deleted'})
  
class ProductDetailView(APIView):
  def get(self, request, pk, format=None):
    obj = ProductListModel.objects.get(pk=pk)
    serializer = ProductListSerializer(obj)

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

class ConfirmOrderViews(APIView):
    def post(self, request):
        serializer = OrderDetailsSerializer(data=request.data)
        if serializer.is_valid():
            try:
                instance = serializer.save()

                fullname = instance.fullname.strip() if instance.fullname else ''
                first_name = fullname.split(' ')[0] if fullname else 'Customer'

                context = {
                    "first_name": first_name,
                    "order_id": instance.order_id,
                    "fullname": instance.fullname,
                    "delivery_address": instance.delivery_address,
                    "contact_email": instance.contact_email,
                    "contact_number": instance.contact_number,
                    "payment_method": instance.payment_method,
                    "receipt_url": instance.receipt_url,
                    "products": instance.products or [],
                    "system_fee": instance.system_fee,
                    "delivery_fee": instance.delivery_fee,
                    "grand_total": instance.grand_total,
                    "created_at": instance.created_at.strftime("%B %d, %Y"),
                }

                if not instance.contact_email:
                    return Response({
                        "status": "error",
                        "message": "Missing contact email"
                    }, status=status.HTTP_400_BAD_REQUEST)

                subject = f"Order {instance.order_id} - Delgar Frozen Products"
                html_message = render_to_string("order_confirmation.html", context)
                plain_message = strip_tags(html_message)

                # Prepare email
                email = EmailMultiAlternatives(
                    subject=subject,
                    body=plain_message,
                    from_email="Delgar Store <noreply@delgar.store>",
                    to=[instance.contact_email],
                    bcc=[
                        'jorenleeluna24@gmail.com',
                        'rodrigogarciajr233@gmail.com',
                        'gracedgarcia223@gmail.com'
                    ]
                )
                email.attach_alternative(html_message, "text/html")
                email.send()

                return Response({
                    "status": "sent",
                    "message": "Order confirmed and email sent."
                })

            except Exception as e:
                traceback.print_exc()
                return Response({
                    "status": "error",
                    "message": "Could not send email",
                    "error": str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        return Response({
            "status": "error",
            "message": "Invalid form data",
            "errors": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
