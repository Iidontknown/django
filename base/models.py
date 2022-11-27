from django.db import models
from django.contrib.auth.models import User

class Grupa(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    nazwa_grupa=models.TextField()
class GrupaUser(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    grupa=models.ForeignKey(Grupa,on_delete=models.CASCADE,null=True)
    allow=models.BooleanField()

class Producent(models.Model):
    nazwa_producent=models.TextField()
class Modell(models.Model):
    Producent=models.ForeignKey(Producent,on_delete=models.CASCADE,null=False)
    nazwa_model=models.TextField()


class Katalog_nadrzedny(models.Model):
    modell=models.ForeignKey(Modell,on_delete=models.CASCADE,null=True)
    nazwa_katalog=models.TextField()
    katalog_wlascicel=models.ForeignKey(User,on_delete=models.CASCADE,null=True)

class Katalog_Grupa(models.Model):
    grupa=models.ForeignKey(Grupa,on_delete=models.CASCADE,null=True)
    katalog=models.ForeignKey(Katalog_nadrzedny,on_delete=models.CASCADE,null=True)



class Strona_katalog(models.Model):
    katalog_nadrzedny=models.ForeignKey(Katalog_nadrzedny,on_delete=models.CASCADE,null=True)
    numer_strony=models.IntegerField()
    nazwa_strony=models.TextField()

class Numer_katalogowy(models.Model):
    Strona_katalog=models.ForeignKey(Strona_katalog,on_delete=models.CASCADE,null=True)
    numer_strony=models.IntegerField()
    opis_Numer_katalogowy=models.TextField()

class Czesc(models.Model):
    Strona_katalog=models.ForeignKey(Strona_katalog,on_delete=models.CASCADE,null=True)
    numer_strony=models.IntegerField()
    opis_Numer_katalogowy=models.TextField()

class Numer_katalogowy_Czesc(models.Model):
    numer_katalogowy=models.ForeignKey(Numer_katalogowy,on_delete=models.CASCADE,null=True)
    czesc=models.ForeignKey(Czesc,on_delete=models.CASCADE,null=True)
    opis_Numer_katalogowy=models.TextField()

# def upload_to(instance, filename):
#     return 'images/{filename}'.format(filename=filename)


class Zdjecie(models.Model):
    wlasciciel=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    tytul_zdiecie=models.TextField()
    opis_zdjecie=models.TextField()
    # image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)