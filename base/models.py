from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Grupa(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE,null=True)
    nazwa_grupa=models.TextField()