"""Basic models."""
from django.db import models
from django.contrib.auth.models import User

from .mixins import AuditingModel

class Person(AuditingModel):
    first_name = models.CharField(max_length=64, default='', blank=True)
    last_name = models.CharField(max_length=64, default='', blank=True)
    email = models.EmailField(default='', blank=True)
    
    class Meta:
        verbose_name_plural = 'people'

    @property
    def full_name(self):
        return (self.first_name + ' ' + self.last_name).strip()

    def __str__(self):
        return self.full_name

class Company(AuditingModel):
    name = models.CharField(max_length=64)
    slug = models.SlugField(max_length=64, unique=True, blank=True)

    class Meta:
        verbose_name_plural = 'companies'

    def __str__(self):
        return self.name
    

class Group(AuditingModel):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=64, unique=True, blank=True)
    about = models.TextField(blank=True)
    people = models.ManyToManyField(Person, blank=True)
    companies = models.ManyToManyField(Company, blank=True)

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name
