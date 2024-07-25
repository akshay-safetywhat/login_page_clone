
from django.contrib import admin
from django.urls import path, include

from drf_yasg import openapi
from drf_yasg.views import get_schema_view
from rest_framework.permissions import AllowAny
from rest_framework.authentication import BasicAuthentication

schema_view = get_schema_view(
    openapi.Info(
       title="Your API",
       default_version='v1',
       description="API for managing users",
    ),
    public=True,
    permission_classes=(AllowAny,),
    authentication_classes=(BasicAuthentication,),
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0),
         name="swagger-schema"),
]
