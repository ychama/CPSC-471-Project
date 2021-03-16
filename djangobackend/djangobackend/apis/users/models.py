from django.db import models, forms

class User(models.Model):
    username = models.CharField(max_length=255, primary_key=True)
    f_name = models.CharField(max_length=255)
    l_name = models.CharField(max_length=255)
    phone_num = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    house_num = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=255)
    street_num = models.CharField(max_length=255)

class Manager(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    salary = models.FloatField()

class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    card_num = models.CharField(max_length=16)

class Admin(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    salary = models.FloatField()






