from django.contrib import admin
from .models import User, Manager, Customer, Admin, Supplier,Ingredient,RestaurantBranch,FoodItem, FoodUses,Driver,Vehicle,Shift,Order

admin.site.register(User)
admin.site.register(Manager)
admin.site.register(Customer)
admin.site.register(Admin)
admin.site.register(Supplier)
admin.site.register(Ingredient)
admin.site.register(RestaurantBranch)
admin.site.register(FoodItem)
admin.site.register(FoodUses)
admin.site.register(Driver)
admin.site.register(Vehicle)
admin.site.register(Shift)
admin.site.register(Order)
