from rest_framework.permissions import BasePermission
from .models import CustomUser

class IsAuthorOrReadOnly(BasePermission):
  """
  Custom permission to allow only authors of an object to edit it.
  """

  def has_permission(self, request, view):
    return True

  def has_object_permission(self, request, view, obj):
    if request.user.is_authenticated:
      if request.method in permissions.SAFE_METHODS:
        return True

      return obj.author == request.user
    return False
