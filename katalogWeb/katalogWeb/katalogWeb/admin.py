from django.contrib import admin
from .models import katalogWeb

class TodoAdmin(admin.ModelAdmin):
  list = ('title', 'description', 'completed')

  admin.site.register(katalogWeb, katalogWeb)