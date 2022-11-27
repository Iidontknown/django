
from django.urls import path
from . import views
from .views import MyTokenObtainPairView,RegisterView
from rest_framework_simplejwt.views import (
    
    TokenRefreshView,
)


urlpatterns = [
    path('', views.getRoutes),
     path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='auth_register'),
    path('grupa/',views.getGrupa),
    path('producent/',views.getProducent),
    path('producent/<int:pk>',views.getProducent_pk),
    path('modell/',views.getModell),
    path('modell/<int:pk>',views.getModell_pk),
    path('katalog_nadrzedny/',views.getKatalog_nadrzedny),
    path('katalog_nadrzedny/<int:pk>',views.getKatalog_nadrzedny_pk),
    path('katalog_grupa/',views.getKatalog_Grupa),
    path('katalog_grupa/<int:pk>',views.getKatalog_Grupa_pk),
    path('strona_katalog/',views.getStrona_katalog),
    path('strona_katalog/<int:pk>',views.getStrona_katalog_pk),
]
