"""Basic models."""
from django.db import models
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
        related_name='partner_reverse', help_text='Each person can have at most one partner.')
    known_via = models.ForeignKey('self', on_delete=models.SET_NULL, blank=True, null=True, 
        related_name='known_via_set')
    slug = models.SlugField(max_length=128, blank=True)

    company = models.ForeignKey('Company', on_delete=models.SET_NULL, blank=True, null=True, 
        related_name='people')
    sectors = models.ManyToManyField('Sector', blank=True, 
        related_name='people')

    city = models.CharField(max_length=50, default='Chicago', blank=True)
    birthday = models.DateField(blank=True, null=True, help_text='Use any year if unknown.')
    address = models.TextField(default='', blank=True)

    notes = models.TextField(default='', blank=True)
    level = models.FloatField(default=0, editable=False, help_text="Classification of contact")

    class Meta:
        verbose_name_plural = 'people'
        unique_together = ('slug', 'created_by')
        ordering = ('first_name', 'last_name')

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
    """A place where people work/study."""
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


class ConversationManager(UserManager):
    def seeds(self):
        return super(ConversationManager, self).get_queryset().filter(seed=False)

class Conversation(BaseModel):
    """A conversation, reciprocated or not, with a person."""
    objects = ConversationManager()

    MODES = (
        (None, 'Select one'),
        ('one on one', 'In person (one on one)'),
        ('in group', 'In person (group)'),
        ('skype', 'Skype'),
        ('phone', 'Phone call'),
        ('email', 'Email'),
        ('text', 'Text message'),
    )
    id = HashidAutoField(primary_key=True, min_length=3)
    people = models.ManyToManyField(Person, related_name='conversations')
    mode = models.CharField(max_length=16, choices=MODES, blank=False)
    summary = models.CharField(max_length=64, blank=False)
    seed = models.BooleanField(default=False, help_text='Check if this conversation was a "seed", trying to set up a conversation.')
    date = models.DateField(default=timezone.now, help_text='Enter in any format.')
    location = models.CharField(max_length=32, default='', blank=True)
    notes = models.TextField(help_text='A summary of the conversation.', blank=True)

    class Meta:
        ordering = ('-date', 'mode')

    def __str__(self):
        return '{0} on {1:%b %-d}: {2} ({3})'.format(
            self.people_str,
            self.date,
            self.summary,
            self.mode,
        )

    def save(self, *args, **kwargs):
        """Perform checks."""
        if self.seed and self.mode in ['one on one', 'in person', 'skype', 'phone']:
            raise ValidationError('How can the conversation be unreciprocated if it was via {0}?'.format(self.mode))
        super(Conversation, self).save(*args, **kwargs)

    def get_absolute_url(self):
        return reverse('conversation_detail', kwargs={'pk': self.pk})

    @property
    def people_str(self):
        """Human-friendly list of people in this conversation."""
        people = list(self.people.all())
        if not len(people):
            return ''
        elif len(people) == 1:
            return str(people[0])
        elif len(people) == 2:
            return '{0} & {1}'.format(
                people[0].first_name,
                people[1].first_name,
            )
        elif len(people) == 3:
            return '{0}, {1}, and {2}'.format(
                people[0].first_name,
                people[1].first_name,
                people[2].first_name)
        else:
            return '{0}, {1}, and {2} others'.format(
                people[0].first_name,
                people[1].first_name,
                len(people) - 2)

    def get_mode_icon(self):
        return {
            'one on one': 'fa-user-friends',
            'in group': 'fa-users',
            'skype': 'fa-skype',
            'phone': 'fa-phone',
            'email': 'fa-envelope',
            'text': 'fa-mobile-alt',
        }.get(self.mode)


