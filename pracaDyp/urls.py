from django.contrib import admin
from core.views import front
from django.urls import path, include
from django.contrib.auth.models import User
from rest_framework import routers, serializers, viewsets
from rest import views as viewRest

router = routers.DefaultRouter()
router.register(r'users', viewRest.UserViewSet)
router.register(r'groups', viewRest.GroupViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", front, name="front"),
    path("ala/", front, name="front"),
    path('rest', include(router.urls))
]
