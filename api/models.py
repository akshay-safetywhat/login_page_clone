from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    first_name = models.CharField(max_length=255, blank=True, null=True)
    last_name = models.CharField(max_length=255, blank=True, null=True)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=50, blank=True, null=True)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'email']

    def __str__(self):
        return self.username


class UserOptions(models.Model):
    title = models.CharField(max_length=100, unique=True)
    description = models.CharField(max_length=100)
    value = models.JSONField()

    def __str__(self):
        return self.title

    # def add_option(self, category, option):
    #     if category not in self.value:
    #         self.value[category] = []
    #     if option not in self.value[category]:
    #         self.value[category].append(option)

    # def remove_option(self, category, option):
    #     if category in self.value and option in self.value[category]:
    #         self.value[category].remove(option)


class BlacklistedAccessToken(models.Model):
    token = models.TextField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.token

# {
#     'id': {
#         '1': {
#             'title': "",
#             "description": "",
#             "values": {
#                 'main_item': ['sub_items']
#             }
#         },
#         '2': {
#             'title': "",
#             "description": "",
#             "values": {
#                 'main_item': ['sub_items']
#             }
#         },
#     }
# }
