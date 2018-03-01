"""Admin for the main models."""
from django.contrib import admin

from .mixins import AuditingAdminModelMixin
from .models import Person, Company, Group, Sector

auditing_fields = ['active', 'created_by', 'created_on', 'modified_by', 'modified_on']
auditing_fieldset = (
    'Auditing', { 
        'classes': ('collapse',),
        'fields': [
            'active',
            'created_by',
            'created_on',
            'modified_by',
            'modified_on',
        ],
    })

class PersonAdmin(AuditingAdminModelMixin, admin.ModelAdmin):
    readonly_fields = auditing_fields
    list_display = ['full_name', 'city', 'company']
    search_fields = ['full_name']
    list_filter = ('sectors', 'city', 'company')
    fieldsets = [
        (None, { 'fields': [
            'first_name', 
            'last_name',
            'city',
            'partner',
            'company',
            'sectors',
        ]}), 
        ('Contact information', { 'fields': [
            'personal_email',
            'work_email',
            'personal_phone',
            'work_phone',
            'address',
            'other_contact_info',
        ]}),
        auditing_fieldset,
    ]

class CompanyAdmin(AuditingAdminModelMixin, admin.ModelAdmin):
    readonly_fields = auditing_fields
    fieldsets = [
        (None, { 'fields': [
            'name', 
            'slug',
        ]}), 
        auditing_fieldset,
    ]

class GroupAdmin(AuditingAdminModelMixin, admin.ModelAdmin):
    readonly_fields = auditing_fields
    fieldsets = [
        (None, { 'fields': [
            'name', 
            'slug',
            'about',
            'people',
            'companies',
        ]}), 
        auditing_fieldset,
    ]


class SectorAdmin(AuditingAdminModelMixin, admin.ModelAdmin):
    readonly_fields = auditing_fields
    fieldsets = [
        (None, { 'fields': [
            'name', 
            'slug',
            'description',
        ]}), 
        auditing_fieldset,
    ]

admin.site.register(Person, PersonAdmin)
admin.site.register(Company, CompanyAdmin)
admin.site.register(Group, GroupAdmin)
admin.site.register(Sector, SectorAdmin)



    
