from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import UserSerializer, CustomerSerializer
from .models import User, Customer

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

    def list(self, request, pk=None):
        return Response(status.HTTP_404_NOT_FOUND)

    def create(self, request, pk=None):
        return Response(status.HTTP_404_NOT_FOUND)
