"""
Seeds URL Configuration
"""
from django.conf import settings
from django.conf.urls import url, include
from django.contrib import admin

from . import views

urlpatterns = [
    url(r'^', include('django.contrib.auth.urls')),
    url(r'^$', views.Home.as_view(), name='home'),
    url(r'^about/$', views.About.as_view(), name='about'),

    # People
    url(r'^people/$', views.PeopleList.as_view(), name='people_list'),
    url(r'^people/add/$', views.PersonCreate.as_view(), name='person_create'),
    url(r'^people/(?P<slug>[\w-]+)/$', views.PersonDetail.as_view(), name='person_detail'),
    url(r'^people/(?P<slug>[\w-]+)/edit/$', views.PersonUpdate.as_view(), name='person_update'),
    url(r'^people/(?P<slug>[\w-]+)/delete/$', views.PersonDelete.as_view(), name='person_delete'),

    # Connections
    
    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', admin.site.urls),
]

if settings.DEBUG and 'debug_toolbar' in settings.INSTALLED_APPS:
    import debug_toolbar
    urlpatterns = [
        url(r'^__debug__/', include(debug_toolbar.urls)),
    ] + urlpatterns
