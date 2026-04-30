import json
import time
import hmac
import hashlib
import base64
from urllib.parse import quote, urlencode
from urllib.request import Request, urlopen

from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import redirect

def create_jwt(payload: dict, secret: str) -> str:
    header = {'alg': 'HS256', 'typ': 'JWT'}
    header_b64 = base64.urlsafe_b64encode(json.dumps(header, separators=(',', ':')).encode()).rstrip(b'=').decode()
    payload_data = {
        **payload,
        'iat': int(time.time()),
        'exp': int(time.time()) + 60 * 60 * 24 * 7,
    }
    body_b64 = base64.urlsafe_b64encode(json.dumps(payload_data, separators=(',', ':')).encode()).rstrip(b'=').decode()
    signature = hmac.new(secret.encode(), f"{header_b64}.{body_b64}".encode(), hashlib.sha256).digest()
    sig_b64 = base64.urlsafe_b64encode(signature).rstrip(b'=').decode()
    return f"{header_b64}.{body_b64}.{sig_b64}"


def get_request_origin(request):
    scheme = request.scheme or 'http'
    host = request.get_host()
    return f"{scheme}://{host}"


def build_absolute_url(request, path: str) -> str:
    origin = get_request_origin(request)
    return f"{origin}{path}"


def exchange_google_code(code: str, redirect_uri: str):
    token_url = 'https://oauth2.googleapis.com/token'
    payload = urlencode({
        'code': code,
        'client_id': getattr(settings, 'GOOGLE_CLIENT_ID', ''),
        'client_secret': getattr(settings, 'GOOGLE_CLIENT_SECRET', ''),
        'redirect_uri': redirect_uri,
        'grant_type': 'authorization_code',
    }).encode('utf-8')

    request = Request(token_url, data=payload, headers={'Content-Type': 'application/x-www-form-urlencoded'})
    with urlopen(request, timeout=15) as response:
        body = response.read().decode('utf-8')
    return json.loads(body)


def fetch_google_profile(access_token: str):
    profile_url = 'https://www.googleapis.com/oauth2/v3/userinfo'
    request = Request(profile_url, headers={'Authorization': f'Bearer {access_token}'})
    with urlopen(request, timeout=15) as response:
        body = response.read().decode('utf-8')
    return json.loads(body)


def google_auth(request):
    client_id = getattr(settings, 'GOOGLE_CLIENT_ID', '')
    auth_auth = getattr(settings, 'AUTH_ORIGIN', '').rstrip('/')
    
    path_parts = request.path.strip('/').split('/')
    default_origin = 'techsavvy'
    if len(path_parts) >= 2 and path_parts[0] == 'api':
        maybe_origin = path_parts[1]
        if maybe_origin in ['kathies', 'workflow', 'delgar', 'techsavvy']:
            default_origin = maybe_origin

    origin = request.GET.get('origin', default_origin)
    request.session['auth_origin'] = origin
    request.session.modified = True
    
    base_path = request.path
    if not base_path.endswith('/'): base_path += '/'
    redirect_path = base_path + 'callback'
    
    redirect_uri = f"{auth_auth}{redirect_path}" if auth_auth else build_absolute_url(request, redirect_path)

    if not client_id:
        return JsonResponse({'success': False, 'error': 'Google client ID is not configured on the backend.'}, status=500)

    params = urlencode({
        'client_id': client_id,
        'redirect_uri': redirect_uri,
        'response_type': 'code',
        'scope': 'openid email profile',
        'access_type': 'offline',
        'prompt': 'consent',
    })
    return redirect(f'https://accounts.google.com/o/oauth2/v2/auth?{params}')


def google_auth_callback(request):
    code = request.GET.get('code')
    origin = request.session.get('auth_origin', 'techsavvy')
    
    frontend_urls = getattr(settings, 'FRONTEND_URLS', {})
    techsavvy_url = getattr(settings, 'FRONTEND_TECHSAVVY_URL', 'https://techsavvies.space')
    frontend_base = frontend_urls.get(origin, techsavvy_url)

    if not code:
        return redirect(f"{frontend_base.rstrip('/')}/client/landing?error=no_code")

    try:
        auth_auth = getattr(settings, 'AUTH_ORIGIN', '').rstrip('/')
        redirect_uri = f"{auth_auth}{request.path}" if auth_auth else build_absolute_url(request, request.path)
        token_response = exchange_google_code(code, redirect_uri)
        access_token = token_response.get('access_token')
        if not access_token:
            raise ValueError('Google did not return an access token')

        profile = fetch_google_profile(access_token)
        email = profile.get('email')
        if not email:
            raise ValueError('No email found in Google profile')

        # Multi-origin user handling
        if origin == 'kathies':
            from kathieskitchen.models import User as KathiesUser
            user, created = KathiesUser.objects.get_or_create(
                email=email,
                defaults={
                    'fname': profile.get('given_name', ''),
                    'lname': profile.get('family_name', ''),
                    'status': 'Active',
                    'user_type': 'Customer'
                }
            )
        elif origin == 'workflow':
            from workflow.models import User as WorkflowUser
            user, created = WorkflowUser.objects.get_or_create(
                email=email,
                defaults={
                    'first_name': profile.get('given_name', ''),
                    'last_name': profile.get('family_name', ''),
                    'role': 'staff', # Default role
                }
            )
        else:
            # Default to techsavvy/delgar user model
            if origin == 'techsavvy':
                allowed_domains = {"lsu.edu.ph", "gmail.com", "yahoo.com", "aptitudeentertainment.com", "outlook.com", "microsoft.com", "techsavvies.space"}
                domain = email.split('@')[1].lower() if '@' in email else ""
                if domain not in allowed_domains:
                    raise ValueError(f"Email domain '{domain}' is not authorized for TechSavvy.")
            
            from delgar_api.views import create_or_get_google_user
            user, created = create_or_get_google_user(profile)

        # Logging
        action = 'Google account created' if created else 'Google login successful'
        details = f"{action} for {email} via {origin}"
        
        try:
            from delgar_api.models import Logs
            Logs.objects.create(
                action=action,
                entity='auth',
                details=details,
                type='INFO',
                user=user if hasattr(user, 'id') else None,
            )
        except Exception:
            pass

        # JWT Creation
        token_payload = {
            'id': getattr(user, 'id', getattr(user, 'user_id', None)),
            'name': profile.get('name') or profile.get('given_name') or email.split('@')[0],
            'email': email,
            'picture': profile.get('picture', ''),
            'usertype': getattr(user, 'usertype', getattr(user, 'role', 'Customer')),
            'origin': origin
        }
        
        jwt_token = create_jwt(token_payload, getattr(settings, 'SECRET_KEY', ''))

        frontend_url = f"{frontend_base.rstrip('/')}/client/landing?token={quote(jwt_token)}"
        return redirect(frontend_url)

    except Exception as exc:
        print(f"Error in google_auth_callback: {exc}")
        origin = request.session.get('auth_origin', 'techsavvy')
        frontend_urls = getattr(settings, 'FRONTEND_URLS', {})
        techsavvy_url = getattr(settings, 'FRONTEND_TECHSAVVY_URL', 'https://techsavvies.space')
        frontend_base = frontend_urls.get(origin, techsavvy_url)
        return redirect(f"{frontend_base.rstrip('/')}/client/landing?error=oauth_failed")
