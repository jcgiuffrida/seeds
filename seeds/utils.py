"""Reusable methods."""
import itertools
from datetime import date, timedelta

from django.contrib.contenttypes.models import ContentType
from django.db.models import Count
from django.utils import timezone
from django.template.defaultfilters import slugify as dj_slugify

def slugify(obj, attribute=None):
    """Creates/updates the object's slug."""
    ObjectClass = ContentType.objects.get_for_model(obj).model_class()
    assert hasattr(ObjectClass, 'slug'), 'Object class does not have a slug field'
    max_length = ObjectClass._meta.get_field('slug').max_length

    # Every model with a slug field needs to have a _slug_field method returning
    # the string that should be used to make the slug (e.g. self.title or self.name)
    slug_content = None
    if attribute and hasattr(ObjectClass, attribute):
        slug_content = getattr(obj, attribute)
    elif hasattr(ObjectClass, 'get_slug_content'):
        slug_content = obj.get_slug_content()
    elif hasattr(ObjectClass, 'name'):
        slug_content = obj.name
    else:
        raise Exception('Object class has no get_slug_content method or name field')

    if obj.pk and obj.slug:
        # Already has a slug - check that slug_content hasn't changed
        if dj_slugify(slug_content)[:max_length] == obj.slug:
            # No change needed
            return obj.slug

    # Iteratively adjust slug to avoid duplicates
    # Pattern is slug-content-1, slug-content-2, etc.
    slug = orig = dj_slugify(slug_content)[:max_length]
    for slug_number in itertools.count(1):
        existing = ObjectClass.objects.for_user(obj.created_by).exclude(pk=obj.pk).filter(slug=slug)
        if not existing.exists():
            break

        # Add hyphen-number and then truncate
        slug = '%s-%d' % (orig[:max_length - len(str(slug_number)) - 1], slug_number)

    return slug

def count_by_week(qs, days=90):
    """Return a count of records for each week in the past X days."""
    STARTING_POINT = timezone.now().date() - timedelta(days=min(days, 355)) # off so we don't double-count the current week
    STARTING_POINT += timedelta(days = 6 - STARTING_POINT.weekday())  # sunday

    conversations = list(qs
        .filter(
            seed=False,
            date__gte=STARTING_POINT)
        .values('date__week')
        .order_by()
        .annotate(count=Count('date__week')))
    conversations = {t['date__week']: t['count'] for t in conversations}

    seeds = list(qs
        .filter(
            seed=True,
            date__gte=STARTING_POINT)
        .values('date__week')
        .order_by()
        .annotate(count=Count('date__week')))
    seeds = {t['date__week']: t['count'] for t in seeds}

    def all_sundays():
        d = STARTING_POINT
        this_sunday = timezone.now().date() + timedelta(days=6 - timezone.now().weekday())
        while d <= this_sunday:
            yield d
            d += timedelta(days=7)

    conversations_by_week = []
    seeds_by_week = []
    weeks = []

    for week in all_sundays():
        # Thankfully, Python weeks end on sundays, so week_num is the same
        weeks.append(week.strftime('%b %-d'))
        conversations_by_week.append(conversations.get(week.isocalendar()[1], 0)) # week number
        seeds_by_week.append(seeds.get(week.isocalendar()[1], 0))

    return {
        'dates': weeks,
        'conversations': conversations_by_week,
        'seeds': seeds_by_week,
    }

def count_by_month(qs, months=12):
    """Return a count of records for each month in the past X months."""
    STARTING_POINT = timezone.now().date() - timedelta(days=round(months * 30.4, 0) - 31)
    STARTING_POINT = date(STARTING_POINT.year, STARTING_POINT.month, 1) # first of month

    conversations = list(qs
        .filter(
            seed=False,
            date__gte=STARTING_POINT)
        .values('date__month')
        .order_by()
        .annotate(count=Count('date__month')))
    conversations = {t['date__month']: t['count'] for t in conversations}

    seeds = list(qs
        .filter(
            seed=True,
            date__gte=STARTING_POINT)
        .values('date__month')
        .order_by()
        .annotate(count=Count('date__month')))
    seeds = {t['date__month']: t['count'] for t in seeds}

    def all_months():
        d = STARTING_POINT
        this_month = timezone.now().month
        while d.month != this_month:
            yield d
            if (d.month == 12):
                d = date(d.year + 1, 1, 1)
            else:
                d = date(d.year, d.month + 1, 1)
        yield d

    conversations_by_month = []
    seeds_by_month = []
    months = []

    for d in all_months():
        months.append(d.strftime('%B'))
        conversations_by_month.append(conversations.get(d.month, 0)) # month number
        seeds_by_month.append(seeds.get(d.month, 0))

    return {
        'dates': months,
        'conversations': conversations_by_month,
        'seeds': seeds_by_month,
    }
