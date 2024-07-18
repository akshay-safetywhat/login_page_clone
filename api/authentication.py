from rest_framework.authentication import get_authorization_header
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import BlacklistedAccessToken


class CustomJWTAuthentication(JWTAuthentication):
    def authenticate(self, request):
        # Get the token from the request
        auth = get_authorization_header(request).decode('utf-8')
        if not auth.startswith('Bearer '):
            return None

        token = auth.split(' ')[1]

        # Check if the token is blacklisted
        if BlacklistedAccessToken.objects.filter(token=token).exists():
            raise AuthenticationFailed('Token has been blacklisted.')

        return super().authenticate(request)
