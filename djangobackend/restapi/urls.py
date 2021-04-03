from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'auth', views.AuthUserViewSet)
router.register(r'customer', views.CustomerViewSet)
router.register(r'foods', views.FoodItemViewSet)
router.register(r'driver', views.DriverViewSet)
router.register(r'shift', views.ShiftViewSet)

urlpatterns = [
    path('', include(router.urls))
]