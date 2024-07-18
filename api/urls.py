from django.urls import path
from .views import AddUserAPIView, LoginAPIView, AllUsersAPIView, UserAPIView, LogoutAPIView, UserOptionsDetailView

urlpatterns = [
    path('login/', LoginAPIView.as_view()),
    path('user/', UserAPIView.as_view()),
    path('all-users/', AllUsersAPIView.as_view()),
    path('adduser/', AddUserAPIView.as_view()),
    path('logout/', LogoutAPIView.as_view()),
    path('user_options/', UserOptionsDetailView.as_view(),
         name='user_options_detail'),
]
