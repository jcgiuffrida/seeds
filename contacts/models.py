"""Basic models."""
from django.db import models
from django.contrib.auth.models import User

class Contact(models.Model):
    first_name = models.CharField(max_length=64, default='', blank=True)
    last_name = models.CharField(max_length=64, default='', blank=True)
    email = models.EmailField(default='', blank=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, editable=False, related_name='contacts')
    timestamp = models.DateTimeField(auto_now_add=True, editable=False)

    @property
    def full_name(self):
        return (self.first_name + ' ' + self.last_name).trim()
