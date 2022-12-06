from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(Grupa)
admin.site.register(GrupaUser)
admin.site.register(Producent)
admin.site.register(Modell)
admin.site.register(Katalog_nadrzedny)
admin.site.register(Katalog_Grupa)
admin.site.register(Strona_katalog)
admin.site.register(Numer_katalogowy)
admin.site.register(Czesc)
admin.site.register(Numer_katalogowy_Czesc)
admin.site.register(Zdjecie)