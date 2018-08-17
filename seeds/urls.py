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
]
