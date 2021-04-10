from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'auth', views.AuthUserViewSet)
router.register(r'token', views.TokenViewSet)
router.register(r'customer', views.CustomerViewSet)
router.register(r'order', views.CustomerOrderViewSet)
router.register(r'branch', views.BranchViewSet)
router.register(r'foods', views.FoodItemViewSet)
router.register(r'driver', views.DriverViewSet)
router.register(r'shift', views.ShiftViewSet)
router.register(r'manager', views.ManagerViewSet)
router.register(r'ingredient', views.IngredientViewSet)
router.register(r'order/driver', views.DriverOrderViewSet)

urlpatterns = [
    path('', include(router.urls))
]