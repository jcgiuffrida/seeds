"""Basic models."""
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.utils import timezone

from .mixins import AuditingModel

class UserManager(models.Manager):
    """Manager to filter objects by the user who created them."""
    def for_user(self, user):
        return super(UserManager, self).get_queryset().filter(active=True, created_by=user)

class Person(AuditingModel):
    """Model for a person."""
    objects = UserManager()
    
    active = models.BooleanField(default=True, help_text='Set this to False instead of deleting.')
    first_name = models.CharField(max_length=64, default='', blank=True)
    last_name = models.CharField(max_length=64, default='', blank=True)
    partner = models.OneToOneField('self', on_delete=models.SET_NULL, blank=True, null=True) # TODO limit_choices_to Person.objects.for_user() - and company and sector too

    company = models.ForeignKey('Company', on_delete=models.SET_NULL, blank=True, null=True, related_name='people')
    sectors = models.ManyToManyField('Sector', blank=True, related_name='people')
    
    city = models.CharField(max_length=50, default='Chicago', blank=True)
    birthday = models.DateField(blank=True, null=True, help_text='Ignore the year if unknown.')
    address = models.TextField(default='', blank=True)

    class Meta:
        verbose_name_plural = 'people'

    @property
    def name(self):
        if self.last_name:
            return (self.first_name + ' ' + self.last_name).strip()
        else:
            # Last name not known
            if self.partner:
                return self.first_name + ' (' + str(self.partner) + ')'
            elif self.company:
                return self.first_name + ' (' + self.company + ')'
            else:
                return self.first_name + ' (?)'

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        # If partner removed or changed, need to remove on their side too
        old_partner = None
        if self.id:
            obj = Person.objects.get(id=self.id)
            old_partner = obj.partner
        super(Person, self).save(*args, **kwargs)
        if old_partner and old_partner != self.partner:
            # Partner changed
            old_partner.partner = None
            super(Person, old_partner).save()
        # If new partner, need to save on their side too
        if self.partner and not self.partner.partner == self:
            self.partner.partner = self
            super(Person, self.partner).save()

class Company(AuditingModel):
    objects = UserManager()

    active = models.BooleanField(default=True, help_text='Set this to False instead of deleting.')
    name = models.CharField(max_length=64)
    slug = models.SlugField(max_length=64, unique=True, blank=True)

    class Meta:
        verbose_name_plural = 'companies'

    def __str__(self):
        return self.name
    

class Group(AuditingModel):
    objects = UserManager()
    
    active = models.BooleanField(default=True, help_text='Set this to False instead of deleting.')
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=64, unique=True, blank=True)
    about = models.TextField(blank=True)
    people = models.ManyToManyField(Person, blank=True)
    companies = models.ManyToManyField(Company, blank=True)

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name


class Sector(AuditingModel):
    objects = UserManager()

    active = models.BooleanField(default=True, help_text='Set this to False instead of deleting.')
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=64, unique=True, blank=True)
    description = models.TextField(default='', blank=True)

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name


class Encounter(AuditingModel):
    objects = UserManager()

    MODES = (
        ('in person', 'In person'),
        ('skype', 'Skype'),
        ('phone', 'Phone call'),
        ('email', 'Email'),
        ('text', 'Text'),
    )
    person = models.ForeignKey(Person, on_delete=models.CASCADE, related_name='encounters')
    mode = models.CharField(max_length=16, choices=MODES)
    reciprocated = models.BooleanField(default=False)
    date = models.DateField(default=timezone.now)
    notes = models.TextField()



# seeds:
# - include "culture" - running list of what i've sent them
# - variable frequency that i should reach out
# - my siblings
# - dashboard: # seeds, last week/month, % up to date
# - track reciprocal contacts? or until they respond i don't reach out
