import itertools

from django.contrib.auth.models import User
from django.contrib.contenttypes.models import ContentType
from django.db import models
from django.template.defaultfilters import slugify
from django.utils import timezone

class AuditingModel(models.Model):
    """ Fields commonly added to many models to track creation date and user. """
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, editable=False, related_name='%(class)s_created')
    date_added = models.DateTimeField(auto_now_add=True, editable=False)
    date_modified = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        abstract = True

class AuditingAdminModelMixin(object):
    """Adds auditing tools to the `save_model` method of a model class, in the Django admin.
    
    When the model is saved, this mixin updates the `created_by` (if created) or `modified_by` 
    (if modified) fields. It also recalculates the slug field, if present.

    This should be inherited first in the admin class definition.
    """
    def save_model(self, request, obj, form, change):
        """ Adds the current user in the created_by or modified_by field."""
        if not change:
            obj.created_by = request.user
        else:
            obj.modified_by = request.user

        # creates the slug, if the field exists
        ObjectClass = ContentType.objects.get_for_model(obj).model_class()
        if hasattr(ObjectClass, 'slug'):
            max_length = ObjectClass._meta.get_field('slug').max_length

            # Every model with a slug field needs to have a _slug_field method returning
            # the string that should be used to make the slug (e.g. self.title or self.name)
            slug_field = None
            if hasattr(ObjectClass, 'get_slug_field'):
                slug_field = obj.get_slug_field()
            elif hasattr(ObjectClass, 'name'):
                slug_field = obj.name

            if slug_field:
                try:
                    obj.slug = orig = slugify(slug_field)[:max_length]
                    for this_slug in itertools.count(1):
                        existing = ObjectClass.objects.filter(slug=obj.slug)
                        if not existing.exists():
                            break
                        if obj.id and not existing.exclude(id=obj.id).exists():
                            break

                        # Add hyphen-number and then truncate
                        obj.slug = '%s-%d' % (orig[:max_length - len(str(this_slug)) - 1], this_slug)

                except AttributeError:
                    obj.slug = obj.slug

        super(AuditingAdminModelMixin, self).save_model(request, obj, form, change)
