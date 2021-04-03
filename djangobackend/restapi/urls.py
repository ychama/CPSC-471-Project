from django.urls import include, path
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'auth', views.AuthUserViewSet)
router.register(r'customer', views.CustomerViewSet)

urlpatterns = [
    path('', include(router.urls))
]