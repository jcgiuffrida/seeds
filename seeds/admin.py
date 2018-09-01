"""Admin for the main models."""
from django.contrib import admin

from .mixins import AuditingAdminModelMixin
from .models import Person, Company, Group, Sector

auditing_fields = ['active', 'created_by', 'created_on', 'modified_on']
auditing_fieldset = (
    'Auditing', { 
        'classes': ('collapse',),
        'fields': [
            'active',
            'created_by',
            'created_on',
            'modified_on',
        ],
    })

class GroupInline(admin.TabularInline):
    model = Group.people.through
    extra = 0

class PersonAdmin(AuditingAdminModelMixin, admin.ModelAdmin):
    readonly_fields = auditing_fields
    list_display = ['name', 'city', 'company']
    search_fields = ['name']
    list_filter = ('sectors', 'city', 'company')
    inlines = (GroupInline,)
    fieldsets = [
        (None, { 'fields': [
            'first_name', 
            'last_name',
            'city',
            'notes',
            'slug',
        ]}), 
        ('Personal information', { 'fields': [
            'partner',
            'known_via',
            'company',
            'sectors',
            'birthday',
        ]}),
        ('Contact information', { 'fields': [
            'address',
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



    
