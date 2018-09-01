"""Views for the app."""
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import TemplateView, ListView, DetailView, UpdateView, CreateView, DeleteView

from .forms import PersonForm
from .mixins import AccessMixin
from .models import Person

class Home(TemplateView):
    """Home page."""
    template_name = 'home.html'

class About(TemplateView):
    """About page."""
    template_name = 'about.html'

class PeopleList(LoginRequiredMixin, ListView):
    """List of people."""
    model = Person
    template_name = 'people/list.html'

    def get_queryset(self):
        return Person.objects.for_user(self.request.user)

class PersonDetail(AccessMixin, DetailView):
    """Page for a person."""
    model = Person
    template_name = 'people/detail.html'

class PersonUpdate(AccessMixin, UpdateView):
    """Page for a person."""
    model = Person
    form_class = PersonForm
    template_name = 'people/update.html'

class PersonCreate(LoginRequiredMixin, CreateView):
    """Page for a person."""
    model = Person
    form_class = PersonForm
    template_name = 'people/create.html'

    def form_valid(self, form):
        form.instance.created_by = self.request.user
        super(PersonCreate, self).form_valid(form)

class PersonDelete(AccessMixin, DeleteView):
    """Page for a person."""
    model = Person
    template_name = 'people/delete.html'
