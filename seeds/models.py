"""Basic models."""
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.urls import reverse

from hashid_field import HashidAutoField

from .mixins import BaseModel, UserManager

class Person(BaseModel):
    """Model for a person."""
    first_name = models.CharField(max_length=64, default='', blank=True)
    last_name = models.CharField(max_length=64, default='', blank=True)
    partner = models.OneToOneField('self', on_delete=models.SET_NULL, blank=True, null=True, 
        related_name='partner_reverse', help_text='Each person can have at most one partner.') # TODO limit_choices_to
    known_via = models.OneToOneField('self', on_delete=models.SET_NULL, blank=True, null=True, 
        related_name='known_via_set') # TODO limit_choices_to 
    slug = models.SlugField(max_length=128, blank=True)

    company = models.ForeignKey('Company', on_delete=models.SET_NULL, blank=True, null=True, 
        related_name='people') # TODO limit_choices_to
    sectors = models.ManyToManyField('Sector', blank=True, 
        related_name='people') # TODO limit_choices_to

    city = models.CharField(max_length=50, default='Chicago', blank=True)
    birthday = models.DateField(blank=True, null=True, help_text='Ignore the year if unknown.')
    address = models.TextField(default='', blank=True)

    notes = models.TextField(default='', blank=True)

    class Meta:
        verbose_name_plural = 'people'
        unique_together = ('slug', 'created_by')

    @property
    def name(self):
        if self.last_name:
            return (self.first_name + ' ' + self.last_name).strip()
        else:
            return '{0} ({1})'.format(self.first_name, 
                str(self.partner) or str(self.known_via) or str(self.company) or '?',
            )

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

    def get_absolute_url(self):
        return reverse('person_detail', kwargs={'slug': self.slug})

class Company(BaseModel):
    name = models.CharField(max_length=64)
    slug = models.SlugField(max_length=64, blank=True)

    class Meta:
        verbose_name_plural = 'companies'
        ordering = ('name',)
        unique_together = ('slug', 'created_by')

    def __str__(self):
        return self.name
    

class Group(BaseModel):
    """A group of people."""
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=64, blank=True)
    about = models.TextField(blank=True)
    people = models.ManyToManyField(Person, blank=True)
    companies = models.ManyToManyField(Company, blank=True)

    class Meta:
        ordering = ('name',)
        unique_together = ('slug', 'created_by')

    def __str__(self):
        return self.name


class Sector(BaseModel):
    """A field where people work."""
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=64, blank=True)
    description = models.TextField(default='', blank=True)

    class Meta:
        ordering = ('name',)
        unique_together = ('slug', 'created_by')

    def __str__(self):
        return self.name


class ConnectionManager(UserManager):
    def seeds(self):
        return super(ConnectionManager, self).get_queryset().filter(reciprocated=False)

class Connection(BaseModel):
    """A connection, reciprocated or not, with a person."""
    objects = ConnectionManager()

    MODES = (
        (None, '(Select one)'),
        ('one on one', 'In person (one on one)'),
        ('in person', 'In person (group)'),
        ('skype', 'Skype'),
        ('phone', 'Phone call'),
        ('email', 'Email'),
        ('text', 'Text'),
    )
    id = HashidAutoField(primary_key=True, min_length=3)
    mode = models.CharField(max_length=16, choices=MODES, blank=False)
    reciprocated = models.BooleanField(default=False)
    date = models.DateField(default=timezone.now)
    location = models.CharField(max_length=32, default='', blank=True, help_text='In person only')
    notes = models.TextField(help_text='A summary of the conversation.')

    class Meta:
        ordering = ('-date', 'mode')

    def __str__(self):
        return self.mode

    def save(self, *args, **kwargs):
        """Perform checks."""
        if not self.reciprocated and self.mode in ['one on one', 'in person', 'skype', 'phone']:
            raise ValidationError('How can the connection be unreciprocated if it was via {0}?'.format(self.mode))
        super(Connection, self).save(*args, **kwargs)

    def get_absolute_url(self):
        return ''


