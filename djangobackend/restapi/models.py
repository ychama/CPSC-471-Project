from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class User(AbstractUser):
    phone_num = models.CharField(max_length=255)
    house_num = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=255)
    street_num = models.CharField(max_length=255)

class Manager(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False, primary_key=True)
    salary = models.FloatField()

class Customer(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False, primary_key=True)
    card_num = models.CharField(max_length=16)

class Admin(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False, primary_key=True)
    salary = models.FloatField()


class Supplier(models.Model):
    supplier_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    house_num = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=255)
    street_num = models.CharField(max_length=255)

class Ingredient(models.Model):
    ingredient_id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=255)
    quantity = models.IntegerField()
    supplier_id = models.ForeignKey(Supplier, on_delete=models.SET_NULL,null=True)

class RestaurantBranch (models.Model):
    branch_id = models.IntegerField(primary_key=True)
    phone_num = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    house_num = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=255)
    street_num = models.CharField(max_length=255)
    manager = models.OneToOneField(Manager, on_delete=models.SET_NULL,null=True, related_name="branch")


class FoodItem (models.Model):
    name = models.CharField(max_length=255,primary_key=True)
    resteraunt_branches = models.ManyToManyField(RestaurantBranch, related_name="food_items")

class FoodUses(models.Model):
    amount = models.IntegerField()
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    food_item = models.ForeignKey(FoodItem, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('ingredient', 'food_item')        


class Driver (models.Model):
    f_name = models.CharField(max_length=255)
    l_name = models.CharField(max_length=255)
    phone_num = models.CharField(max_length=255)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=False, primary_key=True)
    branch = models.ForeignKey(RestaurantBranch, on_delete=models.SET_NULL, null=True)

class Vehicle(models.Model):
    vin = models.CharField(max_length=255, primary_key=True)
    branch = models.ForeignKey(RestaurantBranch, on_delete=models.CASCADE)
    drivers = models.ManyToManyField(Driver, related_name="vehicles")
    model = models.CharField(max_length=255)
    make = models.CharField(max_length=255)

    class Meta:
        unique_together = ('vin', 'branch')

class Shift(models.Model):
    start_time = models.DateTimeField()
    duration = models.IntegerField()
    manager = models.ForeignKey(Manager, on_delete=models.SET_NULL, null=True)
    driver = models.ForeignKey(Driver, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('start_time', 'driver')

class Order(models.Model):
    order_date = models.DateTimeField()
    driver = models.ForeignKey(Driver, on_delete=models.SET_NULL, null=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    food_items = models.ManyToManyField(FoodItem, related_name="orders")

    class Meta:
        unique_together = ('order_date', 'customer')









