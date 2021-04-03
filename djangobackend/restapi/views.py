from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import UserSerializer, CustomerSerializer, FoodItemSerializer, DriverSerializer, ShiftSerializer, BranchSerializer
from .models import User, Customer, FoodItem, RestaurantBranch, Driver, Shift


def enforce(create=AllowAny, retrieve=AllowAny, update=AllowAny,
            partial_update=AllowAny, list=AllowAny, destroy=AllowAny):
    def _enforce(func):
        def wrapper(self):
            permission_classes = []
            if self.action == 'create':
                permission_classes = [create()]
            elif self.action == 'retrieve':
                permission_classes = [retrieve()]
            elif self.action == 'update':
                permission_classes = [update()]
            elif self.action == 'partial_update':
                permission_classes = [partial_update()]
            elif self.action == 'list':
                permission_classes = [list()]
            else:
                permission_classes = [destroy()]
            return func(self) + permission_classes
        return wrapper
    return _enforce

class AuthUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    @enforce(retrieve=IsAuthenticated, update=IsAuthenticated, create=AllowAny)
    def get_permissions(self):
        return []

    def list(self, request):
        return Response(status.HTTP_404_NOT_FOUND)

    def destroy(self, request, pk=None):
        return Response(status.HTTP_404_NOT_FOUND)

    def partial_update(self, request, pk=None):
        return Response(status.HTTP_404_NOT_FOUND)

    def create(self, request):
        queryset = User.objects.all()
        data = request.data
        if(queryset.filter(username=data['username'])):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create(username=data['username'], password=data['password'], email=data['email'], first_name=data['first_name'], last_name=data['last_name'], phone_num=data['phone_num'], house_num=data['house_num'], postal_code=data['postal_code'], street_num=data['street_num'], user_role=data['user_role'])
        user_serializer = UserSerializer(user)
        user.password = user_serializer.validate_password(data['password'])
        user.save()

        customer = Customer.objects.create(user=user, card_num=data['card_num'])
        customer.save()

        serializer = CustomerSerializer(customer)
        return Response(data=serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        user_serializer = UserSerializer(user)
        user.password = user_serializer.validate_password(request.data['new_password'])
        user.save()
        return Response(status.HTTP_200_OK)


class CustomerViewSet(viewsets.ModelViewSet):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = (IsAuthenticated,)

    def destroy(self, request, pk=None):
        return Response(status.HTTP_404_NOT_FOUND)

    def partial_update(self, request, pk=None):
        return Response(status.HTTP_404_NOT_FOUND)

    def list(self, request):
        return Response(status.HTTP_404_NOT_FOUND)

    def create(self, request):
        return Response(status.HTTP_404_NOT_FOUND)

    def update(self, request, pk=None):
        queryset = Customer.objects.all()
        data = request.data
        if(not queryset.filter(user=pk)):
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        customer = queryset.get(user=pk)
        customer_user = User.objects.get(username=pk)

        # updating values
        customer_user.first_name = data['user']['first_name']
        customer_user.last_name = data['user']['last_name']
        customer_user.email = data['user']['email']
        customer_user.phone_num = data['user']['phone_num']
        customer_user.house_num = data['user']['house_num']
        customer_user.postal_code = data['user']['postal_code']
        customer_user.street_num = data['user']['street_num']
        customer.card_num = data['card_num']
        customer_user.save()
        customer.save()

        serializer = CustomerSerializer(customer)
        return Response(data=serializer.data, status=status.HTTP_200_OK)


class BranchViewSet(viewsets.ModelViewSet):
    queryset = RestaurantBranch.objects.all()
    serializer_class = BranchSerializer
    permission_classes = (IsAuthenticated,)

class FoodItemViewSet(viewsets.ModelViewSet):
    queryset = FoodItem.objects.all()
    serializer_class = FoodItemSerializer
    #permission_classes = (IsAuthenticated,)
    
    def retrieve(self, request, pk=None):
        queryset = FoodItem.objects.all()
        Foods = get_object_or_404(RestaurantBranch.objects.all(), pk=pk)
        Items = FoodItemSerializer(Foods.food_items, many=True)
        return Response(Items.data, status.HTTP_200_OK)

class DriverViewSet(viewsets.ModelViewSet):
    queryset = Driver.objects.all()
    serializer_class = DriverSerializer
    #permission_classes = (IsAuthenticated,)

    def retrieve(self, request, pk=None):
        queryset = Driver.objects.all()
        dr = get_object_or_404(Driver.objects.all(), pk=pk)
        drive = DriverSerializer(dr)
        return Response(drive.data, status.HTTP_200_OK)

class ShiftViewSet(viewsets.ModelViewSet):
    queryset = Shift.objects.all()
    serializer_class = ShiftSerializer
    #permission_classes = (IsAuthenticated,)

    def retrieve(self, request, pk=None):
        queryset = Shift.objects.all()
        sh = Shift.objects.all().filter(driver=pk)
        shift = ShiftSerializer(sh, many=True)
        return Response(shift.data, status.HTTP_200_OK)

