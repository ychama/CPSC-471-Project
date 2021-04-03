from rest_framework import serializers
from .models import User, Manager, Customer, Admin
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'first_name', 'last_name', 'email', 'user_role', 'phone_num', 'house_num', 'postal_code', 'street_num')

    def validate_password(self, value: str) -> str:
        return make_password(value)

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('user', 'card_num')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user, context=self.context).data
        return response