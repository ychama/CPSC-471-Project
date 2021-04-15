from rest_framework import serializers
from .models import User, Manager, Customer, Admin, FoodItem, FoodUses, Driver, Shift, RestaurantBranch, Order, Manager, Supplier, Ingredient
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

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = ('name', 'supplier_id')

class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = ('ingredient_id', 'name', 'quantity')

class FoodUsesSerializer(serializers.ModelSerializer):
    ingredient = IngredientSerializer()
    class Meta:
        model = FoodUses
        fields = ('ingredient', 'amount')

class FoodItemUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = ('name', 'price', 'restaurant_branches')

class FoodItemSerializer(serializers.ModelSerializer):
    food_uses = FoodUsesSerializer(many=True)
    class Meta:
        model = FoodItem
        fields = ('name', 'price', 'restaurant_branches', 'food_uses')

class PastOrderSerializer(serializers.ModelSerializer):
    food_items = FoodItemSerializer(many = True, read_only = True)
    customer = CustomerSerializer(read_only=True)
    class Meta:
        model = Order
        fields = ('order_date','food_items', 'order_delivered', 'customer')

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ('user', 'card_num')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user, context=self.context).data
        return response

class DriverSerializer(serializers.ModelSerializer):
    class Meta:
        model = Driver
        fields = ('user', 'branch', 'salary')
    
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user, context=self.context).data
        return response

class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = ('id','start_time', 'duration', 'manager', 'driver',)
  
class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Manager
        fields = ('user', 'branch', 'salary')

    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['user'] = UserSerializer(instance.user, context=self.context).data
        return response
