from django.contrib.auth.models import User
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import redirect_to_login
from django.core.exceptions import PermissionDenied
from django.db import models
from django.utils import timezone

from .utils import slugify

class UserManager(models.Manager):
    """Manager to filter objects by the user who created them."""
    def get_queryset(self):
        return super(UserManager, self).get_queryset().filter(active=True)

    def all_objects(self):
        return super(UserManager, self).get_queryset()

    def for_user(self, user):
        if user.is_authenticated:
            return self.get_queryset().filter(created_by=user)
        return self.none()

class BaseModel(models.Model):
    """
    Standard model template. 

    Adds a custom manager and fields for auditing, and overrides the save and delete methods.
    """
    objects = UserManager()

    active = models.BooleanField(default=True, help_text='Set this to False instead of deleting.')

    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, 
        editable=False, db_index=True, related_name='%(class)s_created')
    created_on = models.DateTimeField(auto_now_add=True, editable=False)
    modified_on = models.DateTimeField(auto_now=True, editable=False)

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        if hasattr(self, 'slug'):
            self.slug = slugify(self)
        super(BaseModel, self).save(*args, **kwargs)

    def delete(self, force=True, **kwargs):
        """Change active to False rather than deleting the object."""
        if force:
            return super(AuditingModel, self).delete(**kwargs)
        elif self.active:
            self.active = False
            self.save()
        return (1, {'Objects': 'set to inactive instead of being deleted'})


class AuditingAdminModelMixin(object):
    """Adds auditing tools to the `save_model` method of a model class, in the Django admin.
    
    When the model is saved, this mixin updates the `created_by` field (if created). 
    It also recalculates the slug field, if present.

    This should be inherited first in the admin class definition.
    """
    def save_model(self, request, obj, form, change):
        if not change:
            obj.created_by = request.user

        super(AuditingAdminModelMixin, self).save_model(request, obj, form, change)


class AccessMixin(LoginRequiredMixin, object):
    """
    Check that the user created the object they want to see.

    Works on any object with a created_by field.
    """
    def get_queryset(self):
        return self.model.objects.for_user(self.request.user)
