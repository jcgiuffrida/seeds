"""Views for the app."""
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView

class Home(TemplateView):
    """Home page."""
    template_name = 'home.html'

class About(TemplateView):
    """About page."""
    template_name = 'about.html'
