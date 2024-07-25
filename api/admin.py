from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, UserOptions


# @admin.register(CustomUser)
class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'first_name', 'last_name',
                    'is_staff', 'role')
    # fieldsets = (
    #     (None, {'fields': ('username', 'password')}),
    #     ('Personal info', {'fields': ('first_name', 'last_name', 'email')}),
    #     ('Additional info', {'fields': ('role',)}),
    #     ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser',
    #                                 'groups', 'user_permissions')}),
    #     ('Important dates', {'fields': ('last_login', 'date_joined')}),
    # )


# @admin.register(Home_list)
class UserOptionsAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'value')
    # search_fields = ('title', 'description')


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(UserOptions, UserOptionsAdmin)
