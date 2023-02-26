
from django.forms import ImageField
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from rest_framework.serializers import ModelSerializer
from base.models import *


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )

    password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'email')

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()

        return user


class GrupaSerializer(ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), required=True)
    nazwa_grupa = serializers.CharField(required=True, validators=[
                                        UniqueValidator(queryset=Grupa.objects.all())])

    class Meta:
        model = Grupa
        fields = ('id', 'nazwa_grupa', 'user')

    def create(self, validated_data):
        model_temp = Grupa.objects.create(
            nazwa_grupa=validated_data['nazwa_grupa'],
            user=validated_data['user'],
        )
        model_temp.save()
        return model_temp


class GrupaUserSerializer(ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(), required=True)
    grupa = serializers.PrimaryKeyRelatedField(
        queryset=Grupa.objects.all(), required=True)
    user_name = serializers.CharField(source='user.username', read_only=True)
    grupa_nazwa_grupa = serializers.CharField(
        source='grupa.nazwa_grupa', read_only=True)

    class Meta:
        model = GrupaUser
        fields = ('id', 'grupa', 'user', 'allow',
                  'user_name', 'grupa_nazwa_grupa')

    def create(self, validated_data):
        model_temp = GrupaUser.objects.create(
            grupa=validated_data['grupa'],
            user=validated_data['user'],
            allow=validated_data['allow'],
        )
        model_temp.save()
        return model_temp


class ProducentSerializer(ModelSerializer):
    nazwa_producent = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=Producent.objects.all())]
    )

    class Meta:
        model = Producent
        fields = ('nazwa_producent', 'id')

    def create(self, validated_data):
        producent = Producent.objects.create(
            nazwa_producent=validated_data['nazwa_producent']
        )
        producent.save()
        return producent


class ModellSerializer(ModelSerializer):
    class Meta:
        model = Modell
        fields = ('id', 'nazwa_model', 'Producent')

    def create(self, validated_data):
        modell = Modell.objects.create(
            nazwa_model=validated_data['nazwa_model'],
            Producent=validated_data['Producent'],
        )
        modell.save()
        return modell

class Strona_katalogSerializer(ModelSerializer):

    zdjecie_image_Thumbnails = serializers.CharField(
        source='zdjecie_strona_katalog.image_Thumbnails', read_only=True)

    class Meta:
        model = Strona_katalog
        fields = ('id', 'katalog_nadrzedny', 'numer_strony', 'nazwa_strony',
                  'zdjecie_strona_katalog', 'zdjecie_image_Thumbnails')

    def create(self, validated_data):
        model_temp = Strona_katalog.objects.create(
            katalog_nadrzedny=validated_data['katalog_nadrzedny'],
            numer_strony=validated_data['numer_strony'],
            nazwa_strony=validated_data['nazwa_strony'],
            zdjecie_strona_katalog=validated_data['zdjecie_strona_katalog'],
        )
        model_temp.save()
        return model_temp

class Katalog_nadrzednySerializer(ModelSerializer):
    
    katalog_wlascicel_username =serializers.CharField(source='katalog_wlascicel.username', read_only=True)
    image_Thumbnails = serializers.StringRelatedField(source='strona_katalog_set.first.zdjecie_strona_katalog.image_Thumbnails', read_only=True)
    

    class Meta:
        model = Katalog_nadrzedny
        fields = ('id', 'modell', 'nazwa_katalog', 'katalog_wlascicel','katalog_wlascicel_username','image_Thumbnails')

    def create(self, validated_data):
        katalog_nadrzedny = Katalog_nadrzedny.objects.create(
            modell=validated_data['modell'],
            nazwa_katalog=validated_data['nazwa_katalog'],
            katalog_wlascicel=validated_data['katalog_wlascicel'],
        )
        katalog_nadrzedny.save()
        return katalog_nadrzedny


class Katalog_GrupaSerializer(ModelSerializer):
    
    grupa_nazwa_grupa = serializers.CharField(source='grupa.nazwa_grupa', read_only=True)
    katalog_nazwa_katalog = serializers.CharField(source='katalog.nazwa_katalog', read_only=True)
    class Meta:
        model = Katalog_Grupa
        fields = ('id', 'grupa', 'katalog','grupa_nazwa_grupa','katalog_nazwa_katalog')

    def create(self, validated_data):
        model_temp = Katalog_Grupa.objects.create(
            grupa=validated_data['grupa'],
            katalog=validated_data['katalog'],
        )
        model_temp.save()
        return model_temp




class Numer_katalogowySerializer(ModelSerializer):
    class Meta:
        model = Numer_katalogowy
        fields = ('id', 'strona_katalog', 'numer_katalogowy_strona',
                  'opis_Numer_katalogowy')

    def create(self, validated_data):
        model_temp = Numer_katalogowy.objects.create(
            strona_katalog=validated_data['strona_katalog'],
            numer_katalogowy_strona=validated_data['numer_katalogowy_strona'],
            opis_Numer_katalogowy=validated_data['opis_Numer_katalogowy'],
        )
        model_temp.save()
        return model_temp


class CzescSerializer(ModelSerializer):
    class Meta:
        model = Czesc
        fields = ('id', 'nazwa_Czesc', 'opis_Czesc')

    def create(self, validated_data):
        model_temp = Czesc.objects.create(
            nazwa_Czesc=validated_data['nazwa_Czesc'],
            opis_Czesc=validated_data['opis_Czesc'],
        )
        model_temp.save()
        return model_temp


class Numer_katalogowy_CzescSerializer(ModelSerializer):

    czesc_nazwa_Czesc = serializers.CharField(
        source='czesc.nazwa_Czesc', read_only=True)

    class Meta:
        model = Numer_katalogowy_Czesc
        fields = ('id', 'numer_katalogowy', 'czesc',
                  'opis_Numer_katalogowy_Czesc', 'czesc_nazwa_Czesc','liczba_Numer_katalogowy_Czesc')

    def create(self, validated_data):
        model_temp = Numer_katalogowy_Czesc.objects.create(
            numer_katalogowy=validated_data['numer_katalogowy'],
            czesc=validated_data['czesc'],
            opis_Numer_katalogowy_Czesc=validated_data['opis_Numer_katalogowy_Czesc'],
            liczba_Numer_katalogowy_Czesc=validated_data['liczba_Numer_katalogowy_Czesc'],
        )
        model_temp.save()
        return model_temp


class ZdjecieSerializer(ModelSerializer):

    image = serializers.ImageField(required=False)
    image_Thumbnails = serializers.ImageField(read_only=True)

    class Meta:
        model = Zdjecie
        fields = ('id', 'wlasciciel', 'opis_zdjecie',
                  'image', 'image_Thumbnails')

class ListaSerializer(ModelSerializer):
    class Meta:
        model = Lista
        fields = ('id', 'user', 'nazwa_lista')

    def create(self, validated_data):
        model_temp = Lista.objects.create(
            user=validated_data['user'],
            nazwa_lista=validated_data['nazwa_lista'],
        )
        model_temp.save()
        return model_temp


class Numer_katalogowy_ListaSerializer(ModelSerializer):

    numer_katalogowy_numer_katalogowy_strona = serializers.CharField(
        source='numer_katalogowy.numer_katalogowy_strona', read_only=True)
    numer_katalogowy_opis_Numer_katalogowy = serializers.CharField(
        source='numer_katalogowy.opis_Numer_katalogowy', read_only=True)
    numer_katalogowy_nazwa_katalog = serializers.CharField(
        source='numer_katalogowy.strona_katalog.katalog_nadrzedny.nazwa_katalog', read_only=True)

    class Meta:
        model = Numer_katalogowy_Lista
        fields = ('id', 'numer_katalogowy', 'lista', 'liczba',
                  'numer_katalogowy_numer_katalogowy_strona', 
                  'numer_katalogowy_opis_Numer_katalogowy', 
                  'numer_katalogowy_nazwa_katalog')

    def create(self, validated_data):
        model_temp = Numer_katalogowy_Lista.objects.create(
            numer_katalogowy=validated_data['numer_katalogowy'],
            lista=validated_data['lista'],
            liczba=validated_data['liczba'],
        )
        model_temp.save()
        return model_temp
