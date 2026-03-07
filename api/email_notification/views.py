from rest_framework.response import Response
from rest_framework.views import APIView
from .forms import EmailNotificationForm
from django.template.loader import render_to_string
from django.core import mail
from django.utils.html import strip_tags
# Create your views here.

class SubmitAppointmentToGmailPending(APIView):
  def post(self, request):
    form = EmailNotificationForm(request.data)
    context = {
      "incharge_firstname" : form['incharge_firstname'].value(),
      "incharge_contact_email" : form['incharge_contact_email'].value(),
      "schedule" : form['schedule'].value(),
      "approval_status" : form['approval_status'].value(),
      "remarks" : form['remarks'].value(),
      "tracking_id" : form['tracking_id'].value(),
      "purpose" : form['purpose'].value(),
    }
    if form.is_valid():
      subject = 'Confirm Receipt'
      html_message = render_to_string('pending.html', context)
      plain_message = strip_tags(html_message)
      recipient = form.cleaned_data.get('incharge_contact_email')
      recipient_list = [recipient, 'dev@lsu.edu.ph', 'esmael.larubis@lsu.edu.ph']
      email_from = 'LSU Campus Pass'
      mail.send_mail(subject, plain_message, email_from, recipient_list, html_message=html_message, fail_silently=False)
      return Response({'status':'sent'})
    
class SubmitAppointmentToGmailDeclined(APIView):
  def post(self, request):
    form = EmailNotificationForm(request.data)
    context = {
      "incharge_firstname" : form['incharge_firstname'].value(),
      "incharge_contact_email" : form['incharge_contact_email'].value(),
      "schedule" : form['schedule'].value(),
      "approval_status" : form['approval_status'].value(),
      "remarks" : form['remarks'].value(),
      "tracking_id" : form['tracking_id'].value(),
      "purpose" : form['purpose'].value()
    }
    if form.is_valid():
      subject = 'Declined'
      html_message = render_to_string('declined.html', context)
      plain_message = strip_tags(html_message)
      recipient = form.cleaned_data.get('incharge_contact_email')
      recipient_list = [recipient, 'dev@lsu.edu.ph', 'esmael.larubis@lsu.edu.ph']
      email_from = 'LSU Campus Pass'
      mail.send_mail(subject, plain_message, email_from, recipient_list, html_message=html_message, fail_silently=False)
      return Response({'status':'sent'}) 
    
class SubmitAppointmentToGmailApproved(APIView):
  def post(self, request):
    form = EmailNotificationForm(request.data)
    context = {
      "incharge_firstname" : form['incharge_firstname'].value(),
      "incharge_contact_email" : form['incharge_contact_email'].value(),
      "schedule" : form['schedule'].value(),
      "approval_status" : form['approval_status'].value(),
      "remarks" : form['remarks'].value(),
      "tracking_id" : form['tracking_id'].value(),
      "purpose" : form['purpose'].value()
    }
    if form.is_valid():
      subject = 'Approved'
      html_message = render_to_string('approved.html', context)
      plain_message = strip_tags(html_message)
      recipient = form.cleaned_data.get('incharge_contact_email')
      recipient_list = [recipient, 'dev@lsu.edu.ph', 'esmael.larubis@lsu.edu.ph']
      email_from = 'LSU Campus Pass'
      mail.send_mail(subject, plain_message, email_from, recipient_list, html_message=html_message, fail_silently=False)
      return Response({'status':'sent'}) 
    
class SubmitAppointmentToGmailForRevision(APIView):
  def post(self, request):
    form = EmailNotificationForm(request.data)
    context = {
      "incharge_firstname" : form['incharge_firstname'].value(),
      "incharge_contact_email" : form['incharge_contact_email'].value(),
      "schedule" : form['schedule'].value(),
      "approval_status" : form['approval_status'].value(),
      "remarks" : form['remarks'].value(),
      "tracking_id" : form['tracking_id'].value(),
      "purpose" : form['purpose'].value()
    }
    if form.is_valid():
      subject = 'In Progress'
      html_message = render_to_string('for-revision.html', context)
      plain_message = strip_tags(html_message)
      recipient = form.cleaned_data.get('incharge_contact_email')
      recipient_list = [recipient, 'dev@lsu.edu.ph', 'esmael.larubis@lsu.edu.ph']
      email_from = 'LSU Campus Pass'
      mail.send_mail(subject, plain_message, email_from, recipient_list, html_message=html_message, fail_silently=False)
      return Response({'status':'sent'})