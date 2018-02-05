"""Admin for the main models."""
from django.contrib import admin

from .models import Contact

admin.site.register(Contact)
