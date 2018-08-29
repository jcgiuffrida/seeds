"""
Seeds URL Configuration
"""
from django.conf.urls import url, include
from django.contrib import admin

from . import views

urlpatterns = [
    url(r'^', include('django.contrib.auth.urls')),
    url(r'^$', views.Home.as_view(), name='home'),
    url(r'^about/$', views.About.as_view(), name='about'),
    url(r'^admin/', admin.site.urls),

    # People
    url(r'^people/$', views.PeopleList.as_view(), name='people_list'),
    url(r'^people/add/$', views.PersonCreate.as_view(), name='person_create'),
    url(r'^people/(?P<slug>[\w]+)/$', views.PersonDetail.as_view(), name='person_detail'),
    url(r'^people/(?P<slug>[\w]+)/edit/$', views.PersonUpdate.as_view(), name='person_update'),
    url(r'^people/(?P<slug>[\w]+)/delete/$', views.PersonDelete.as_view(), name='person_delete'),
]
