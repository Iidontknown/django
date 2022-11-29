
from django.conf import settings
from django.urls import path
from . import views
from .views import MyTokenObtainPairView,RegisterView

from django.conf.urls.static import static
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
    path('numer_katalogowy/',views.getNumer_katalogowy),
    path('numer_katalogowy/<int:pk>',views.getNumer_katalogowy_pk),
    path('czesc/',views.getCzesc),
    path('czesc/<int:pk>',views.getCzesc_pk),
    path('numer_katalogowy_czesc/',views.getNumer_katalogowy_Czesc),
    path('numer_katalogowy_czesc/<int:pk>',views.getNumer_katalogowy_Czesc_pk),
    path('zdjecie/',views.getZdjecie),
    path('zdjecie/<int:pk>',views.getZdjecie_pk),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
