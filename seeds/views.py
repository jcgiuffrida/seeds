"""Views for the app."""
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.views.generic import TemplateView, ListView, DetailView, UpdateView, CreateView, DeleteView

from .forms import PersonForm
from .mixins import AccessMixin
from .models import Person, Sector

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
        if self.request.GET.get('sector'):
            return Person.objects.for_user(self.request.user).filter(sectors__slug=self.request.GET.get('sector'))
        return Person.objects.for_user(self.request.user)

    def get_context_data(self):
        context = super(PeopleList, self).get_context_data()
        context.update({
            'sectors': Sector.objects.for_user(self.request.user),
            'search': {
                'sector': self.request.GET.get('sector'),
            },
        })
        return context

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
        return super(PersonCreate, self).form_valid(form)

class PersonDelete(AccessMixin, DeleteView):
    """Page for a person."""
    model = Person
    template_name = 'people/delete.html'
    success_url = reverse_lazy('people_list')
