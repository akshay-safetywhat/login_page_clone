from .models import CustomUser

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.contrib.auth import authenticate
from rest_framework.authentication import get_authorization_header
from rest_framework.exceptions import APIException, AuthenticationFailed
# from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
# from rest_framework_simplejwt.token_blacklist.models import BlacklistedToken, OutstandingToken
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from .serializers import UserSerializer, ProfileSerializer, BlacklistedAccessTokenSerializer, UserOptionsSerializer
from .models import CustomUser, BlacklistedAccessToken, UserOptions
from .authentication import CustomJWTAuthentication

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

class AddUserAPIView(APIView):
    authentication_classes = [CustomJWTAuthentication]

    # permission_classes = [AllowAny]

    @swagger_auto_schema(
        request_body=ProfileSerializer,
        responses={
            201: UserSerializer,
            400: 'Invalid data'
        }
    )
    @permission_classes([IsAuthenticated])
    def post(self, request):
        username = request.data.get('username')
        if CustomUser.objects.filter(username=username).exists():
            return Response({'detail': 'Username already exists'}, status=400)
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginAPIView(APIView):
    permission_classes = [AllowAny]
    @swagger_auto_schema(
        request_body=openapi.Schema(
            method='post',
            type=openapi.TYPE_OBJECT,
            properties={
                'username': openapi.Schema(type=openapi.TYPE_STRING, description='Username'),
                'password': openapi.Schema(type=openapi.TYPE_STRING, description='Password'),
            },
            required=['username', 'password']
        ),
        responses={200: 'Token generated successfully', 400: 'Invalid credentials'}
    )
    # @permission_classes([AllowAny])
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        # print(user)
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            })
        else:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

class UserAPIView(APIView):
    authentication_classes = [CustomJWTAuthentication]

    @permission_classes([IsAuthenticated])
    def get(self, request):
        auth_header = get_authorization_header(request).decode('utf-8')
        if not auth_header.startswith('Bearer '):
            raise AuthenticationFailed('Token not provided or invalid')
        
        token = auth_header.split(' ')[1]
        # token = 
        
        # print(token)
        try:
            access_token = AccessToken(token)
            user_id = access_token['user_id']
            user = CustomUser.objects.get(pk=user_id)
            return Response(UserSerializer(user).data)
        except CustomUser.DoesNotExist:
            raise AuthenticationFailed('User not found')
        except Exception as e:
            raise AuthenticationFailed(f'Invalid token: {str(e)}')


class AllUsersAPIView(APIView):
    # permission_classes = [AllowAny]
    authentication_classes = [CustomJWTAuthentication]

    @swagger_auto_schema(
        responses={200: ProfileSerializer(many=True)}
    )
    @permission_classes([IsAuthenticated])
    # @authentication_classes(CustomJWTAuthentication)
    def get(self, request):
        users = CustomUser.objects.all()
        serializer = ProfileSerializer(users, many=True)
        return Response(serializer.data)


class LogoutAPIView(APIView):
    # authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(
        request_body=BlacklistedAccessTokenSerializer,
        responses={205: 'Logout successful', 400: 'Invalid token or token already blacklisted'}
    )
    # @permission_classes([IsAuthenticated])
    def post(self, request):
        access_token = request.headers.get('Authorization', None).split()[1]
        # print(access_token)
        if not access_token:
            return Response({"error": "Access token is required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # token = AccessToken(access_token)
            if BlacklistedAccessToken.objects.filter(token=access_token).exists():
                return Response({"message": "Access token already blacklisted"}, status=status.HTTP_205_RESET_CONTENT)

            BlacklistedAccessToken.objects.create(token=access_token)
            return Response({"message": "Logout successful"}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response({"error": f"Failed to blacklist access token: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


class UserOptionsDetailView(APIView):
    authentication_classes = [CustomJWTAuthentication]

    @permission_classes([IsAuthenticated])
    def get(self, request, format=None):
        user_options = UserOptions.objects.all()
        serializer = UserOptionsSerializer(user_options, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)