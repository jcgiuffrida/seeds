"""Views for the app."""
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Count
from django.urls import reverse, reverse_lazy
from django.shortcuts import redirect
from django.views.generic import TemplateView, ListView, DetailView, UpdateView, CreateView, DeleteView

from .forms import PersonForm, ConversationForm, CompanyForm, SectorForm
from .mixins import AccessMixin, UserFormMixin
from .models import Person, Sector, Company, Conversation

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

class PersonList(LoginRequiredMixin, ListView):
    """List of people."""
    model = Person
    template_name = 'person/list.html'
    paginate_by = 12

    def get_filters(self):
        if hasattr(self, 'filters'):
            return self.filters

        filters = {}

        sector = self.request.GET.get('sector')
        company = self.request.GET.get('company')
        city = self.request.GET.get('city')
        level = self.request.GET.get('level')

        selected_sector = None
        selected_company = None
        
        if sector:
            try:
                selected_sector = Sector.objects.for_user(self.request.user).get(slug=sector)
            except Sector.DoesNotExist:
                pass

        if company:
            try:
                selected_company = Company.objects.for_user(self.request.user).get(slug=company)
            except Company.DoesNotExist:
                pass

        if level:
            pass # TODO
        
        filters['sector'] = selected_sector
        filters['company'] = selected_company
        filters['city'] = city
        filters['level'] = None
        filters['filtered'] = any([
            filters['sector'], filters['company'], filters['city'], filters['level'],
        ])

        self.filters = filters
        return self.filters

    def get_queryset(self):
        qs = Person.objects.for_user(self.request.user)
        filters = self.get_filters()

        if filters['sector']:
            qs = qs.filter(sectors=filters['sector'])
        if filters['company']:
            qs = qs.filter(company=filters['company'])

        if filters['city']:
            qs = qs.filter(city__iexact=filters['city'])
        
        if filters['level']:
            pass # TODO

        return qs

    def get_context_data(self):
        context = super(PersonList, self).get_context_data()
        companies = list(set([p.company for p in Person.objects.for_user(self.request.user) if p.company]))
        companies.sort(key=lambda c: c.slug)
        cities = list(set([p.city for p in Person.objects.for_user(self.request.user) if p.city]))
        cities.sort()
        context.update({
            'sectors': Sector.objects.for_user(self.request.user),
            'companies': companies,
            'cities': cities,
            'search': self.filters,
        })
        return context

class PersonDetail(AccessMixin, DetailView):
    """Page for a person."""
    model = Person
    template_name = 'person/detail.html'

class PersonUpdate(AccessMixin, UserFormMixin, UpdateView):
    """Page for a person."""
    model = Person
    form_class = PersonForm
    template_name = 'person/update.html'

class PersonCreate(LoginRequiredMixin, UserFormMixin, CreateView):
    """Page for a person."""
    model = Person
    form_class = PersonForm
    template_name = 'person/create.html'

    def form_valid(self, form):
        form.instance.created_by = self.request.user
        return super(PersonCreate, self).form_valid(form)

class PersonDelete(AccessMixin, DeleteView):
    """Page for a person."""
    model = Person
    template_name = 'person/delete.html'
    success_url = reverse_lazy('person_list')

class ConversationList(LoginRequiredMixin, ListView):
    """List all conversations, optionally for a single person or sector."""
    model = Conversation
    template_name = 'conversations/list.html'
    paginate_by = 3

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

class ConversationUpdate(AccessMixin, UserFormMixin, UpdateView):
    """Page for a conversation."""
    model = Conversation
    form_class = ConversationForm
    template_name = 'conversations/update.html'

class ConversationCreate(LoginRequiredMixin, UserFormMixin, CreateView):
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

class CompanyList(LoginRequiredMixin, ListView):
    """List all companies."""
    model = Company
    template_name = 'companies/list.html'

    def get_queryset(self):
        return (Company.objects.for_user(self.request.user)
            .annotate(num_people=Count('people'))
            .order_by('-num_people'))

class CompanyUpdate(AccessMixin, UpdateView):
    """Page for a company."""
    model = Company
    form_class = CompanyForm
    template_name = 'companies/update.html'
    success_url = reverse_lazy('company_list')

class CompanyCreate(LoginRequiredMixin, CreateView):
    """Page for a company."""
    model = Company
    form_class = CompanyForm
    template_name = 'companies/create.html'
    success_url = reverse_lazy('company_list')

    def form_valid(self, form):
        form.instance.created_by = self.request.user
        return super(CompanyCreate, self).form_valid(form)

class CompanyDelete(AccessMixin, DeleteView):
    """Page for a company."""
    model = Company
    template_name = 'companies/delete.html'
    success_url = reverse_lazy('company_list')

class SectorList(LoginRequiredMixin, ListView):
    """List all sectors."""
    model = Sector
    template_name = 'sectors/list.html'

    def get_queryset(self):
        return (Sector.objects.for_user(self.request.user)
            .annotate(num_people=Count('people'))
            .order_by('-num_people')
            .distinct())

class SectorUpdate(AccessMixin, UpdateView):
    """Page for a sector."""
    model = Sector
    form_class = SectorForm
    template_name = 'sectors/update.html'
    success_url = reverse_lazy('sector_list')

class SectorCreate(LoginRequiredMixin, CreateView):
    """Page for a sector."""
    model = Sector
    form_class = SectorForm
    template_name = 'sectors/create.html'
    success_url = reverse_lazy('sector_list')

    def form_valid(self, form):
        form.instance.created_by = self.request.user
        return super(SectorCreate, self).form_valid(form)

class SectorDelete(AccessMixin, DeleteView):
    """Page for a sector."""
    model = Sector
    template_name = 'sectors/delete.html'
    success_url = reverse_lazy('sector_list')
