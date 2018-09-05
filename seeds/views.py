"""Views for the app."""
from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Count
from django.urls import reverse, reverse_lazy
from django.shortcuts import redirect
from django.views.generic import TemplateView, ListView, DetailView, UpdateView, CreateView, DeleteView

from .forms import PersonForm, ConversationForm
from .mixins import AccessMixin
from .models import Person, Sector, Conversation

class Home(TemplateView):
    """Home page."""
    template_name = 'home.html'

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect(reverse('about'))
        return super(Home, self).dispatch(request, *args, **kwargs)

    def get_context_data(self):
        context = super(Home, self).get_context_data()
        context.update({
            'recent_conversations': Conversation.objects.for_user(self.request.user)[:8],
            'top_people': (Person.objects.for_user(self.request.user)
                .annotate(num_conversations=Count('conversations'))
                .order_by('-num_conversations'))[:8],
        })
        return context

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


class ConversationList(LoginRequiredMixin, ListView):
    """List all conversations, optionally for a single person or sector."""
    model = Conversation
    template_name = 'conversations/list.html'

    def get_queryset(self):
        qs = Conversation.objects.for_user(self.request.user)
        if self.request.GET.get('person'):
            qs = qs.filter(people__slug=self.request.GET.get('person')).distinct()
        if self.request.GET.get('sector'):
            qs = qs.filter(people__sectors__slug=self.request.GET.get('sector')).distinct()
        return qs

    def get_context_data(self):
        context = super(ConversationList, self).get_context_data()
        context.update({
            'sectors': Sector.objects.for_user(self.request.user),
            'people': Person.objects.for_user(self.request.user).filter(conversations__isnull=False),
            'search': {
                'sector': self.request.GET.get('sector'),
            },
        })
        if self.request.GET.get('person'):
            context['search']['person'] = (Person.objects.for_user(self.request.user)
                .filter(slug=self.request.GET.get('person'))
                .first())
        return context

class ConversationDetail(AccessMixin, DetailView):
    """Page for a conversation."""
    model = Conversation
    template_name = 'conversations/detail.html'

class ConversationUpdate(AccessMixin, UpdateView):
    """Page for a conversation."""
    model = Conversation
    form_class = ConversationForm
    template_name = 'conversations/update.html'

class ConversationCreate(LoginRequiredMixin, CreateView):
    """Page for a conversation."""
    model = Conversation
    form_class = ConversationForm
    template_name = 'conversations/create.html'

    def form_valid(self, form):
        form.instance.created_by = self.request.user
        return super(ConversationCreate, self).form_valid(form)

    def get_form_kwargs(self):
        kwargs = super(ConversationCreate, self).get_form_kwargs()
        selected_person = None
        if self.request.GET.get('person'):
            try:
                person = Person.objects.for_user(self.request.user).get(
                    slug=self.request.GET.get('person')
                )
                selected_person = person.pk
            except Person.DoesNotExist:
                pass
        kwargs['person'] = selected_person
        return kwargs

class ConversationDelete(AccessMixin, DeleteView):
    """Page for a conversation."""
    model = Conversation
    template_name = 'conversations/delete.html'
    success_url = reverse_lazy('conversation_list')
