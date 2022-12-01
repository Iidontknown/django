from django.db import models
from django.contrib.auth.models import User
from PIL import ImageFont
from PIL import ImageDraw
import uuid
# importing the library
from PIL import Image
import matplotlib.pyplot as plt
import numpy as np

from imagekit.models import ProcessedImageField, ImageSpecField
from imagekit.processors import ResizeToFill


class Grupa(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    nazwa_grupa = models.TextField()


class GrupaUser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    grupa = models.ForeignKey(Grupa, on_delete=models.CASCADE, null=True)
    allow = models.BooleanField()


class Producent(models.Model):
    nazwa_producent = models.TextField()


class Modell(models.Model):
    Producent = models.ForeignKey(
        Producent, on_delete=models.CASCADE, null=False)
    nazwa_model = models.TextField()


class Katalog_nadrzedny(models.Model):
    modell = models.ForeignKey(Modell, on_delete=models.CASCADE, null=True)
    nazwa_katalog = models.TextField()
    katalog_wlascicel = models.ForeignKey(
        User, on_delete=models.CASCADE, null=True)


class Katalog_Grupa(models.Model):
    grupa = models.ForeignKey(Grupa, on_delete=models.CASCADE, null=True)
    katalog = models.ForeignKey(
        Katalog_nadrzedny, on_delete=models.CASCADE, null=True)


class Strona_katalog(models.Model):
    katalog_nadrzedny = models.ForeignKey(
        Katalog_nadrzedny, on_delete=models.CASCADE, null=True)
    numer_strony = models.IntegerField()
    nazwa_strony = models.TextField()


class Numer_katalogowy(models.Model):
    strona_katalog = models.ForeignKey(
        Strona_katalog, on_delete=models.CASCADE, null=True)
    numer_katalogowy_strona = models.TextField()
    opis_Numer_katalogowy = models.TextField()


class Czesc(models.Model):
    numer_katalogowy = models.ForeignKey(
        Numer_katalogowy, on_delete=models.CASCADE, null=True)
    nazwa_Czesc = models.TextField()
    opis_Czesc = models.TextField()


class Numer_katalogowy_Czesc(models.Model):
    numer_katalogowy = models.ForeignKey(
        Numer_katalogowy, on_delete=models.CASCADE)
    czesc = models.ForeignKey(Czesc, on_delete=models.CASCADE, null=True)
    opis_Numer_katalogowy_Czesc = models.TextField()


def upload_to(instance, filename):
    name = uuid.uuid4().hex
    return 'images/'+name+'.JPEG'


class Zdjecie(models.Model):
    wlasciciel = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    tytul_zdiecie = models.TextField()
    opis_zdjecie = models.TextField()

    class Watermark(object):
        def process(self, image):
            draw = ImageDraw.Draw(image)
            font = ImageFont.truetype("arial.ttf", 10)
            draw.text((0, 0), "katalog",
                      (0, 0, 0), font=font)

            return image
    image = ProcessedImageField(upload_to=upload_to,
                                processors=[ResizeToFill(
                                    1000, 500), Watermark()],
                                format='JPEG',
                                options={'quality': 60})
    image_Thumbnails = ImageSpecField(source='image',
                                      processors=[ResizeToFill(
                                          100, 50), Watermark()],
                                      format='JPEG',
                                      options={'quality': 60})
