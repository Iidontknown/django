import json
import os
from django.conf import settings
from django.http import JsonResponse
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from rest_framework import status

from django.contrib.auth.models import User
from .serializers import CzescSerializer, GrupaUserSerializer, Katalog_GrupaSerializer, Katalog_nadrzednySerializer, ListaSerializer, ModellSerializer, Numer_katalogowy_CzescSerializer, Numer_katalogowy_ListaSerializer, Numer_katalogowySerializer, ProducentSerializer, RegisterSerializer, Strona_katalogSerializer, ZdjecieSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny

from .serializers import GrupaSerializer
from base.models import Czesc, Grupa, GrupaUser, Katalog_Grupa, Katalog_nadrzedny, Lista, Modell, Numer_katalogowy, Numer_katalogowy_Czesc, Numer_katalogowy_Lista, Producent, Strona_katalog, Zdjecie

from rest_framework.parsers import JSONParser 
	
from django.db.models import Q
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

# @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# def getGrupaa(request):
#     user=2
#     grupa=Grupa.objects.filter(user=user)
#     serializer=GrupaSerializer(grupa,many=True)
#     return Response(serializer.data)
 
@api_view(['GET', 'POST'])

@permission_classes([IsAuthenticated])
def getGrupa(request):
    user=request.user.id
    if request.method == 'GET':
        grupa=Grupa.objects.filter(user=user)
        serializer=GrupaSerializer(grupa,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data = {
            'nazwa_grupa': request.data.get('nazwa_grupa'),
            'user': user,

        }
        serializer = GrupaSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'dodano'}) 
        else:
            return Response({'message': 'sadasd','error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST) 
       

@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def getGrupa_pk(request,pk):
    try: 
        user=request.user
        model_get = Grupa.objects.get(pk=pk,user=user) 
    except : 
        return Response({'message': 'nie istnieje'}, status=status.HTTP_204_NO_CONTENT) 
 
    if request.method == 'GET': 
        get_serializer = GrupaSerializer(model_get) 
        return Response(get_serializer.data, status=status.HTTP_200_OK) 
    elif request.method == 'PUT': 
        data = {
            'nazwa_grupa': request.data.get('nazwa_grupa')

        }
        serializer = GrupaSerializer(instance = model_get, data=data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        model_get.delete() 
        return Response({'message': 'deleted successfully!'}, status=status.HTTP_200_OK)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getGrupaall(request):
    user=request.user.id
    pk__list=GrupaUser.objects.filter(user=user).values_list('grupa', flat=True)

    grupa=Grupa.objects.filter(~Q(user = user)).exclude(id__in=pk__list)
    serializer=GrupaSerializer(grupa,many=True)
    return Response(serializer.data)
   
 



#GrupaUser view

    
@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
def getGrupaUser(request):
    user=request.user.id
    if request.method == 'GET':
        model_get=GrupaUser.objects.all().filter(user=user) 
        serializer=GrupaUserSerializer(model_get,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        request_data = JSONParser().parse(request)
        request_data['user']=user
        request_data['allow']=False
        serializer = GrupaUserSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'dodano'}) 
        else:
            return Response({'message': 'blad validaci','error':serializer.errors}, status=status.HTTP_417_EXPECTATION_FAILED) 
       

@api_view(['GET','PUT','DELETE'])
# @permission_classes([IsAuthenticated])
def getGrupaUser_pk(request,pk):
    try: 
        model_get = GrupaUser.objects.get(pk=pk) 
    except : 
        return Response({'message': 'nie istnieje'}, status=status.http_204_no_content) 
 
    if request.method == 'GET': 
        get_serializer = GrupaUserSerializer(model_get) 
        return Response(get_serializer.data) 
    elif request.method == 'PUT': 
        serializer = GrupaUserSerializer(instance = model_get, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        model_get.delete() 
        return Response({'message': 'deleted successfully!'}, status=status.HTTP_200_OK)


@api_view(['GET','PUT','DELETE'])
# @permission_classes([IsAuthenticated])
def getGrupaUserGrupa_wybrany_pk(request,pk):
    try: 
        model_get = GrupaUser.objects.all().filter(grupa=pk) 
    except : 
        return Response({'message': 'nie istnieje'}, status=status.http_204_no_content) 
 
    if request.method == 'GET': 
        get_serializer = GrupaUserSerializer(model_get,many=True) 
        return Response(get_serializer.data) 
    elif request.method == 'PUT': 
        serializer = GrupaUserSerializer(instance = model_get, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        model_get.delete() 
        return Response({'message': 'deleted successfully!'}, status=status.HTTP_200_OK)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getGrupaUserGrupa_wybrany_user_pk(request,pk):
    try: 
        model_get = GrupaUser.objects.all().filter(user=pk) 
    except : 
        return Response({'message': 'nie istnieje'}, status=status.http_204_no_content) 
    get_serializer = GrupaUserSerializer(model_get,many=True) 
    return Response(get_serializer.data) 
   


@api_view(['GET','PUT','DELETE'])
# @permission_classes([IsAuthenticated])
def getGrupaUserGrupa_pk(request,pk):
    try: 
        model_get = GrupaUser.objects.all().filter(grupa=pk)
        # model_get = GrupaUser.objects.filter 
    except : 
        return Response({'message': 'nie istnieje'}, status=status.http_204_no_content )
 
    if request.method == 'GET': 
        get_serializer = GrupaUserSerializer(model_get,many=True) 
        return Response(get_serializer.data) 
    elif request.method == 'PUT': 
        serializer = GrupaUserSerializer(instance = model_get, data=request.data, partial = True)
        if serializer.is_valid():
            try:
                serializer.save()
            except:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        model_get.delete() 
        return Response({'message': 'deleted successfully!'}, status=status.HTTP_200_OK)
   
 # Producent view

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
            return Response({'message': 'błąd validaci'}, status=status.HTTP_400_BAD_REQUEST) 
       

@api_view(['GET', 'POST','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def getProducent_pk(request,pk):
    try: 
        producent = Producent.objects.get(pk=pk) 
    except : 
        return Response({'message': 'nie istnieje'}, status=status.HTTP_204_NO_CONTENT) 
 
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
            return Response({'message': 'nie istnieje'}, status=status.http_204_no_content)
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
        return Response({'message': 'nie istnieje'}, status=status.http_204_no_content) 
 
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
@permission_classes([IsAuthenticated])
def getKatalog_nadrzedny(request):
    user=request.user.id
    if request.method == 'GET':
        katalog_nadrzedny=Katalog_nadrzedny.objects.all().filter(katalog_wlascicel=user)
        serializer=Katalog_nadrzednySerializer(katalog_nadrzedny,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        data = {
            'modell': request.data.get('modell'),
            'nazwa_katalog': request.data.get('nazwa_katalog'),
            'katalog_wlascicel': user,

        }
        serializer = Katalog_nadrzednySerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'dodano'}) 
        else:
           
            return Response({'message': 'blad validaci'}, status=status.HTTP_400_BAD_REQUEST) 
       

@api_view(['GET','PUT','DELETE'])
# @permission_classes([IsAuthenticated])
def getKatalog_nadrzedny_pk(request,pk):
    try: 
        model_get = Katalog_nadrzedny.objects.get(pk=pk) 
    except : 
        return Response({'message': 'nie istnieje'}, status=status.http_204_no_content) 
 
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
        return Response({'message': 'nie istnieje'}, status=status.http_204_no_content) 
 
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
        return Response({'message': 'nie istnieje'}, status=status.http_204_no_content) 
 
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
           



@api_view(['GET','PUT','DELETE'])
# @permission_classes([IsAuthenticated])
def getStrona_katalog_wybrany_pk(request,pk):
    try: 
        model_get = Strona_katalog.objects.all().filter(katalog_nadrzedny=pk) 
    except : 
        return Response({'message': 'nie istnieje'}, status=status.http_204_no_content) 
 
    if request.method == 'GET': 
        get_serializer = Strona_katalogSerializer(model_get,many=True) 
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
           
#Numer_katalogowy view

    
@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
def getNumer_katalogowy(request):
    # user=request.producent
    if request.method == 'GET':
        model_get=Numer_katalogowy.objects.all()
        serializer=Numer_katalogowySerializer(model_get,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        request_data = JSONParser().parse(request)
        serializer = Numer_katalogowySerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'dodano'}) 
        else:
            return Response({'message': 'blad validaci'}) 
       

@api_view(['GET','PUT','DELETE'])
# @permission_classes([IsAuthenticated])
def getNumer_katalogowy_pk(request,pk):
    try: 
        model_get = Numer_katalogowy.objects.get(pk=pk) 
    except : 
        return Response({'message': 'nie istnieje'}, status=status.http_204_no_content) 
 
    if request.method == 'GET': 
        get_serializer = Numer_katalogowySerializer(model_get) 
        return Response(get_serializer.data) 
    elif request.method == 'PUT': 
        serializer = Numer_katalogowySerializer(instance = model_get, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        model_get.delete() 
        return Response({'message': 'deleted successfully!'}, status=status.HTTP_200_OK)
@api_view(['GET','PUT','DELETE'])
# @permission_classes([IsAuthenticated])
def getNumer_katalogowy_wybrany_pk(request,pk):
    try: 
        model_get = Numer_katalogowy.objects.all().filter(strona_katalog=pk) 
    except : 
        return Response({'message': 'nie istnieje'}, status=status.http_204_no_content) 
 
    if request.method == 'GET': 
        get_serializer = Numer_katalogowySerializer(model_get,many=True) 
        return Response(get_serializer.data) 
    elif request.method == 'PUT': 
        serializer = Numer_katalogowySerializer(instance = model_get, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        model_get.delete() 
        return Response({'message': 'deleted successfully!'}, status=status.HTTP_200_OK)
                   
#Czesc view

    
@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
def getCzesc(request):
    # user=request.producent
    if request.method == 'GET':
        model_get=Czesc.objects.all()
        serializer=CzescSerializer(model_get,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        request_data = JSONParser().parse(request)
        serializer = CzescSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'dodano','id':serializer.data['id']}) 
        else:
            return Response({'message': 'blad validaci','error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
       

@api_view(['GET','PUT','DELETE'])
@permission_classes([IsAuthenticated])
def getCzesc_pk(request,pk):
    try: 
        model_get = Czesc.objects.get(pk=pk) 
    except : 
        return Response({'message': 'nie istnieje'}, status=status.http_204_no_content) 
 
    if request.method == 'GET': 
        get_serializer = CzescSerializer(model_get) 
        return Response(get_serializer.data) 
    elif request.method == 'PUT': 
        serializer = CzescSerializer(instance = model_get, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        model_get.delete() 
        return Response({'message': 'deleted successfully!'}, status=status.HTTP_200_OK)
           
#Numer_katalogowy_Czesc view

    
@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
def getNumer_katalogowy_Czesc(request):
    # user=request.producent
    if request.method == 'GET':
        model_get=Numer_katalogowy_Czesc.objects.all()
        serializer=Numer_katalogowy_CzescSerializer(model_get,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        request_data = JSONParser().parse(request)
        serializer = Numer_katalogowy_CzescSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'dodano'}) 
        else:
            return Response({'message': 'blad validaci'}) 
       

@api_view(['GET','PUT','DELETE'])
# @permission_classes([IsAuthenticated])
def getNumer_katalogowy_Czesc_pk(request,pk):
    try: 
        model_get = Numer_katalogowy_Czesc.objects.get(pk=pk) 
    except : 
        return Response({'message': 'nie istnieje'}, status=status.http_204_no_content) 
 
    if request.method == 'GET': 
        get_serializer = Numer_katalogowy_CzescSerializer(model_get) 
        return Response(get_serializer.data) 
    elif request.method == 'PUT': 
        serializer = Numer_katalogowy_CzescSerializer(instance = model_get, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        model_get.delete() 
        return Response({'message': 'deleted successfully!'}, status=status.HTTP_200_OK)
@api_view(['GET','PUT','DELETE'])
# @permission_classes([IsAuthenticated])
def getNumer_katalogowy_Czesc_wybrany_pk(request,pk):
    try: 
        model_get = Numer_katalogowy_Czesc.objects.all().filter(numer_katalogowy=pk) 
    except : 
        return Response({'message': 'nie istnieje'}, status=status.http_204_no_content) 
 
    if request.method == 'GET': 
        get_serializer = Numer_katalogowy_CzescSerializer(model_get,many=True) 
        return Response(get_serializer.data) 
    elif request.method == 'PUT': 
        serializer = Numer_katalogowy_CzescSerializer(instance = model_get, data=request.data, partial = True,many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        model_get.delete() 
        return Response({'message': 'deleted successfully!'}, status=status.HTTP_200_OK)
           
@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
def getZdjecie(request):
    
    if request.method == 'GET':
        model_get=Zdjecie.objects.all()
        serializer=ZdjecieSerializer(model_get,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        user=request.user.id
        data = {
            'opis_zdjecie': request.data.get('opis_zdjecie'),
            'wlasciciel': user,
            'image':request.data.get('image'),

        }
        serializer = ZdjecieSerializer(data=data)
        
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'dodano','id':serializer.data['id']}) 
        else:
            return Response({'message': 'blad validaci','data':data,'error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST) 
@api_view(['GET','PUT','DELETE'])
# @permission_classes([IsAuthenticated])
def getZdjecie_pk(request,pk):
    try: 
        model_get = Zdjecie.objects.get(pk=pk) 
    except : 
        return Response({'message': 'nie istnieje'}, status=status.HTTP_204_NO_CONTENT) 
 
    if request.method == 'GET': 
        get_serializer = ZdjecieSerializer(model_get) 
        return Response(get_serializer.data) 
    elif request.method == 'DELETE':
        get_serializer = ZdjecieSerializer(model_get,many=False) 

        if os.path.exists(settings.MEDIA_ROOT+get_serializer.data['image']):
            os.remove(settings.MEDIA_ROOT+get_serializer.data['image'])
            Response(settings.MEDIA_ROOT+ get_serializer.data['image'])
        if os.path.exists(settings.MEDIA_ROOT+get_serializer.data['image_Thumbnails']):
            os.remove(settings.MEDIA_ROOT+get_serializer.data['image_Thumbnails'])
        model_get.delete() 
        return Response( {'message': 'deleted successfully!'}, status=status.HTTP_200_OK)


# view lista
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def getLista(request):
    
    user=request.user.id
    # user=request.producent
    if request.method == 'GET':
        model_get=Lista.objects.filter(user=user)
        serializer=ListaSerializer(model_get,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        request_data = JSONParser().parse(request)
        request_data['user']=user
        serializer = ListaSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'dodano'}) 
        else:
            return Response({'message': 'blad validaci','error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST) 
       

@api_view(['GET','PUT','DELETE'])
# @permission_classes([IsAuthenticated])
def getLista_pk(request,pk):
    try: 
        model_get = Lista.objects.get(pk=pk) 
    except : 
        return Response({'message': 'nie istnieje'}, status=status.http_204_no_content) 
 
    if request.method == 'GET': 
        get_serializer = ListaSerializer(model_get) 
        return Response(get_serializer.data) 
    elif request.method == 'PUT': 
        serializer = ListaSerializer(instance = model_get, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        model_get.delete() 
        return Response({'message': 'deleted successfully!'}, status=status.HTTP_200_OK)

# view Numer_katalogowy_Lista
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def getNumer_katalogowy_Lista(request):
    user=request.user.id
    if request.method == 'GET':
        model_get=Numer_katalogowy_Lista.objects.filter(lista__user__id=user)
        serializer=Numer_katalogowy_ListaSerializer(model_get,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        request_data = JSONParser().parse(request)
        serializer = Numer_katalogowy_ListaSerializer(data=request_data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'dodano'}) 
        else:
            return Response({'message': 'blad validaci','error':serializer.errors}, status=status.HTTP_400_BAD_REQUEST) 
       

@api_view(['GET','PUT','DELETE'])
# @permission_classes([IsAuthenticated])
def getNumer_katalogowy_Lista_pk(request,pk):
    try: 
        model_get = Numer_katalogowy_Lista.objects.get(pk=pk) 
    except : 
        return Response({'message': 'nie istnieje'}, status=status.http_204_no_content) 
 
    if request.method == 'GET': 
        get_serializer = Numer_katalogowy_ListaSerializer(model_get) 
        return Response(get_serializer.data) 
    elif request.method == 'PUT': 
        serializer = Numer_katalogowy_ListaSerializer(instance = model_get, data=request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        model_get.delete() 
        return Response({'message': 'deleted successfully!'}, status=status.HTTP_200_OK)

@api_view(['GET','PUT','DELETE'])
# @permission_classes([IsAuthenticated])

def getNumer_katalogowy_Lista_wybrany_pk(request,pk):
    try: 
        model_get = Numer_katalogowy_Lista.objects.all().filter(lista=pk) 
    except : 
        return Response({'message': 'nie istnieje'}, status=status.http_204_no_content) 
 
    if request.method == 'GET': 
        get_serializer = Numer_katalogowy_ListaSerializer(model_get,many=True) 
        return Response(get_serializer.data) 
    elif request.method == 'PUT': 
        serializer = Numer_katalogowy_ListaSerializer(instance = model_get, data=request.data, partial = True,many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE': 
        model_get.delete() 
        return Response({'message': 'deleted successfully!'}, status=status.HTTP_200_OK)