"""Common shortcuts."""
from django.conf import settings
from django.contrib.auth.models import User, Group, Permission
from django.contrib.contenttypes.models import ContentType
from django.core.urlresolvers import reverse
from django.db import connection
from django.db.models import Count, F, Q, Max, Min
from django.utils import timezone

from contacts.models import Person
