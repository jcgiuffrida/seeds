"""Reusable methods."""
import itertools

from django.contrib.contenttypes.models import ContentType
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
