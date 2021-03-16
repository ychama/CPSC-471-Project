from django.contrib import admin
from users.models import User, Manager, Customer, Admin

admin.site.register(User)
admin.site.register(Manager)
admin.site.register(Customer)
admin.site.register(Admin)
