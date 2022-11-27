from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework import status

from django.contrib.auth.models import User
from .serializers import Katalog_GrupaSerializer, Katalog_nadrzednySerializer, ModellSerializer, ProducentSerializer, RegisterSerializer, Strona_katalogSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny

from .serializers import GrupaSerializer
from base.models import Grupa, Katalog_Grupa, Katalog_nadrzedny, Modell, Producent, Strona_katalog

from rest_framework.parsers import JSONParser 

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['email'] = user.email

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/token',
        '/api/token/refresh',
    ]

    return Response(routes)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getGrupa(request):
    user=request.user
    grupa=Grupa.objects.filter(user=user)
    serializer=GrupaSerializer(grupa,many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def getProducent(request):
    # user=request.producent
    if request.method == 'GET':
        grupa=Producent.objects.all()
        serializer=ProducentSerializer(grupa,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        producent_data = JSONParser().parse(request)
        producent_serializer = ProducentSerializer(data=producent_data)
        if producent_serializer.is_valid():
            producent_serializer.save()
            return Response({'message': 'dodano'}) 
        else:
            return Response({'message': 'błąd validaci'}) 
       

@api_view(['GET', 'POST','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def getProducent_pk(request,pk):
    try: 
        producent = Producent.objects.get(pk=pk) 
    except : 
        return Response({'message': 'nie istnieje'}) 
 
    if request.method == 'GET': 
        Producent_serializer = ProducentSerializer(producent) 
        return Response(Producent_serializer.data) 
 
    elif request.method == 'PUT': 
        try: 
            producent = Producent.objects.get(pk=pk)
        except : 
            return Response({'message': 'nie istnieje'})
        data = {
            'nazwa_producent': request.data.get('nazwa_producent')
        }
        serializer = ProducentSerializer(instance = producent, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        try: 
            producent = Producent.objects.get(pk=pk) 
        except : 
            return Response({'message': 'nie istnieje'})
        producent.delete() 
        return Response({'message': 'Producent was deleted successfully!'})
           
    
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def getModell(request):
    # user=request.producent
    if request.method == 'GET':
        modell=Modell.objects.all()
        serializer=ModellSerializer(modell,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        modell_data = JSONParser().parse(request)
        modell_serializer = ModellSerializer(data=modell_data)
        if modell_serializer.is_valid():
            modell_serializer.save()
            return Response({'message': 'dodano'}) 
        else:
            return Response({'message': 'blad validaci'}) 
       

@api_view(['GET', 'POST','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def getModell_pk(request,pk):
    try: 
        modell = Modell.objects.get(pk=pk) 
    except : 
        return Response({'message': 'nie istnieje'}) 
 
    if request.method == 'GET': 
        modell_serializer = ModellSerializer(modell) 
        return Response(modell_serializer.data) 
 
    elif request.method == 'PUT': 
        data = {
            'nazwa_model': request.data.get('nazwa_model')
        }
        serializer = ModellSerializer(instance = modell, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        modell.delete() 
        return Response({'message': 'deleted successfully!'}, status=status.HTTP_200_OK)
           


#Katalog_nadrzedny view

    
@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
def getKatalog_nadrzedny(request):
    # user=request.producent
    if request.method == 'GET':
        katalog_nadrzedny=Katalog_nadrzedny.objects.all()
        serializer=Katalog_nadrzednySerializer(katalog_nadrzedny,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        request_data = JSONParser().parse(request)
        serializer = Katalog_nadrzednySerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'dodano'}) 
        else:
            return Response({'message': 'blad validaci'}) 
       

@api_view(['GET','PUT','DELETE'])
# @permission_classes([IsAuthenticated])
def getKatalog_nadrzedny_pk(request,pk):
    try: 
        model_get = Katalog_nadrzedny.objects.get(pk=pk) 
    except : 
        return Response({'message': 'nie istnieje'}) 
 
    if request.method == 'GET': 
        get_serializer = Katalog_nadrzednySerializer(model_get) 
        return Response(get_serializer.data) 
 
    elif request.method == 'PUT': 
        data = {
            'modell': request.data.get('modell'),
            'nazwa_katalog': request.data.get('nazwa_katalog'),
        }
        serializer = Katalog_nadrzednySerializer(instance = model_get, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        model_get.delete() 
        return Response({'message': 'deleted successfully!'}, status=status.HTTP_200_OK)
           
#Katalog_Grupa view

    
@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
def getKatalog_Grupa(request):
    # user=request.producent
    if request.method == 'GET':
        model_get=Katalog_Grupa.objects.all()
        serializer=Katalog_GrupaSerializer(model_get,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        request_data = JSONParser().parse(request)
        serializer = Katalog_GrupaSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'dodano'}) 
        else:
            return Response({'message': 'blad validaci'}) 
       

@api_view(['GET','PUT','DELETE'])
# @permission_classes([IsAuthenticated])
def getKatalog_Grupa_pk(request,pk):
    try: 
        model_get = Katalog_Grupa.objects.get(pk=pk) 
    except : 
        return Response({'message': 'nie istnieje'}) 
 
    if request.method == 'GET': 
        get_serializer = Katalog_GrupaSerializer(model_get) 
        return Response(get_serializer.data) 
 
    elif request.method == 'DELETE': 
        model_get.delete() 
        return Response({'message': 'deleted successfully!'}, status=status.HTTP_200_OK)
           
#Strona_katalog view

    
@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
def getStrona_katalog(request):
    # user=request.producent
    if request.method == 'GET':
        model_get=Strona_katalog.objects.all()
        serializer=Strona_katalogSerializer(model_get,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        request_data = JSONParser().parse(request)
        serializer = Strona_katalogSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'dodano'}) 
        else:
            return Response({'message': 'blad validaci'}) 
       

@api_view(['GET','PUT','DELETE'])
# @permission_classes([IsAuthenticated])
def getStrona_katalog_pk(request,pk):
    try: 
        model_get = Strona_katalog.objects.get(pk=pk) 
    except : 
        return Response({'message': 'nie istnieje'}) 
 
    if request.method == 'GET': 
        get_serializer = Strona_katalogSerializer(model_get) 
        return Response(get_serializer.data) 
    elif request.method == 'PUT': 
        serializer = Strona_katalogSerializer(instance = model_get, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        model_get.delete() 
        return Response({'message': 'deleted successfully!'}, status=status.HTTP_200_OK)
           
