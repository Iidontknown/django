
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
    class Meta:
        model=Grupa
        fields=('id','nazwa_grupa','user')

class ProducentSerializer(ModelSerializer):
    nazwa_producent = serializers.CharField(
            required=True,
            validators=[UniqueValidator(queryset=Producent.objects.all())]
            )
    class Meta:
        model=Producent
        fields=('nazwa_producent','id')
    def create(self, validated_data):
        producent = Producent.objects.create(
            nazwa_producent=validated_data['nazwa_producent']
        )
        producent.save()
        return producent

class ModellSerializer(ModelSerializer):
    class Meta:
        model=Modell
        fields=('id','nazwa_model','Producent')
        
    def create(self, validated_data):
        modell = Modell.objects.create(
            nazwa_model=validated_data['nazwa_model'],
            Producent=validated_data['Producent'],
        )
        modell.save()
        return modell

class Katalog_nadrzednySerializer(ModelSerializer):
    class Meta:
        model=Katalog_nadrzedny
        fields=('id','modell','nazwa_katalog','katalog_wlascicel')
        
    def create(self, validated_data):
        katalog_nadrzedny = Katalog_nadrzedny.objects.create(
            modell=validated_data['modell'],
            nazwa_katalog=validated_data['nazwa_katalog'],
            katalog_wlascicel=validated_data['katalog_wlascicel'],
        )
        katalog_nadrzedny.save()
        return katalog_nadrzedny

class Katalog_GrupaSerializer(ModelSerializer):
    class Meta:
        model=Katalog_Grupa
        fields=('id','grupa','katalog')
        
    def create(self, validated_data):
        model_temp = Katalog_Grupa.objects.create(
            grupa=validated_data['grupa'],
            katalog=validated_data['katalog'],
        )
        model_temp.save()
        return model_temp

class Strona_katalogSerializer(ModelSerializer):
    class Meta:
        model=Strona_katalog
        fields=('id','katalog_nadrzedny','numer_strony','nazwa_strony')
        
    def create(self, validated_data):
        model_temp = Strona_katalog.objects.create(
            katalog_nadrzedny=validated_data['katalog_nadrzedny'],
            numer_strony=validated_data['numer_strony'],
            nazwa_strony=validated_data['nazwa_strony'],
        )
        model_temp.save()
        return model_temp