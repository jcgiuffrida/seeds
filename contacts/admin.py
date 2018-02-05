"""Admin for the main models."""
from django.contrib import admin

from .mixins import AuditingAdminModelMixin
from .models import Person, Company, Group

class PersonAdmin(AuditingAdminModelMixin, admin.ModelAdmin):
    list_filter = ['date_added']

class CompanyAdmin(AuditingAdminModelMixin, admin.ModelAdmin):
    list_filter = ['date_added']

class GroupAdmin(AuditingAdminModelMixin, admin.ModelAdmin):
    list_filter = ['date_added']

admin.site.register(Person, PersonAdmin)
admin.site.register(Company, CompanyAdmin)
admin.site.register(Group, GroupAdmin)
