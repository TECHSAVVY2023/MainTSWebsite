import json

from django.http import JsonResponse, HttpResponse, HttpResponseBadRequest
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods, require_POST

from .services import CheckoutService, WebhookService, OrderService


@csrf_exempt
@require_http_methods(["POST"])
def create_checkout(request):
    try:
        body = json.loads(request.body.decode("utf-8"))
    except Exception:
        return JsonResponse({"error": "Invalid JSON"}, status=400)

    return CheckoutService.create(body)


@csrf_exempt
@require_POST
def paymongo_webhook(request):
    raw = request.body

    sig = request.META.get("HTTP_PAYMONGO_SIGNATURE", "")
    if hasattr(request, "headers"):
        sig = request.headers.get("Paymongo-Signature") or sig

    if not WebhookService.verify(raw, sig):
        return HttpResponse("Invalid signature", status=403)

    return WebhookService.handle(raw)

@csrf_exempt
@require_http_methods(["GET"])
def order_status(request, reference: str):
    from .models import MerchCheckoutOrder

    try:
        order = MerchCheckoutOrder.objects.get(reference_number=reference)
    except MerchCheckoutOrder.DoesNotExist:
        return JsonResponse({"error": "not found"}, status=404)

    return JsonResponse({
        "reference_number": order.reference_number,
        "status": order.status,
        "checkout_session_id": order.checkout_session_id,
        "total_centavos": order.total_centavos,
    })

@require_http_methods(["GET"])
def merch_order_status(request, reference):
    return OrderService.get(reference)