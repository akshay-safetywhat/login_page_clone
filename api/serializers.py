from rest_framework.serializers import ModelSerializer
from .models import CustomUser, UserOptions, BlacklistedAccessToken


class UserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = CustomUser(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'username', 'email',
                  'password', 'role']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = CustomUser(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user


class UserOptionsSerializer(ModelSerializer):
    class Meta:
        model = UserOptions
        fields = ['title', 'description', 'value']


class BlacklistedAccessTokenSerializer(ModelSerializer):
    class Meta:
        model = BlacklistedAccessToken
        fields = ['token']
