"""
Seeds URL Configuration
"""
from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin

from . import views

urlpatterns = [
    url(r'^', include('django.contrib.auth.urls')),
    url(r'^$', views.About.as_view(), name='about'),
    url(r'^dashboard/$', views.Home.as_view(), name='home'),

    # People
    url(r'^people/$', views.PersonList.as_view(), name='person_list'),
    url(r'^people/add/$', views.PersonCreate.as_view(), name='person_create'),
    url(r'^people/(?P<slug>[\w-]+)/$', views.PersonDetail.as_view(), name='person_detail'),
    url(r'^people/(?P<slug>[\w-]+)/edit/$', views.PersonUpdate.as_view(), name='person_update'),
    url(r'^people/(?P<slug>[\w-]+)/delete/$', views.PersonDelete.as_view(), name='person_delete'),

    # Conversations
    url(r'^conversations/$', views.ConversationList.as_view(), name='conversation_list'),
    url(r'^conversations/add/$', views.ConversationCreate.as_view(), name='conversation_create'),
    url(r'^conversations/(?P<pk>\w{3,})/$', views.ConversationDetail.as_view(), name='conversation_detail'),
    url(r'^conversations/(?P<pk>\w{3,})/edit/$', views.ConversationUpdate.as_view(), name='conversation_update'),
    url(r'^conversations/(?P<pk>\w{3,})/delete/$', views.ConversationDelete.as_view(), name='conversation_delete'),

    # Sectors
    url(r'^sectors/$', views.SectorList.as_view(), name='sector_list'),
    url(r'^sectors/add/$', views.SectorCreate.as_view(), name='sector_create'),
    url(r'^sectors/(?P<slug>[\w-]+)/edit/$', views.SectorUpdate.as_view(), name='sector_update'),
    url(r'^sectors/(?P<slug>[\w-]+)/delete/$', views.SectorDelete.as_view(), name='sector_delete'),

    # Companies
    url(r'^companies/$', views.CompanyList.as_view(), name='company_list'),
    url(r'^companies/add/$', views.CompanyCreate.as_view(), name='company_create'),
    url(r'^companies/(?P<slug>[\w-]+)/$', views.CompanyUpdate.as_view(), name='company_update'),
    url(r'^companies/(?P<slug>[\w-]+)/delete/$', views.CompanyDelete.as_view(), name='company_delete'),

    # API
    url(r'^api/people/$', views.PersonAPI.as_view(), name='person_api'),
    url(r'^api/trend/$', views.TrendAPI.as_view(), name='trend_api'),

    # Admin
    url(r'^sanctum/doc/', include('django.contrib.admindocs.urls')),
    url(r'^sanctum/', admin.site.urls),
]

if settings.DEBUG and 'debug_toolbar' in settings.INSTALLED_APPS:
    import debug_toolbar
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns

admin.site.site_header = 'Seeds'
admin.site.site_title = 'Seeds'
admin.site.index_title = 'Manage Seeds'
