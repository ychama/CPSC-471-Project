from rest_framework import serializers
from .models import User, Manager, Customer, Admin, FoodItem, Driver, Shift, RestaurantBranch
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

class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantBranch
        fields = ('branch_id', 'phone_num', 'house_num', 'street_num', 'postal_code')

class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = ('name',)

class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = ('user', 'f_name', 'l_name', 'phone_num', 'branch',)

class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = ('start_time', 'duration', 'manager', 'driver',)
  
