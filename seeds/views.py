"""Views for the app."""
from datetime import timedelta

from django.contrib import messages
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Count, Q, Value, Max
from django.db.models.functions import Concat
from django.http import JsonResponse
from django.shortcuts import redirect
from django.urls import reverse, reverse_lazy
from django.utils import timezone
from django.views.generic import TemplateView, ListView, DetailView, UpdateView, CreateView, DeleteView

from .forms import PersonForm, ConversationForm, CompanyForm, SectorForm
from .mixins import AccessMixin, UserFormMixin
from .models import Person, Sector, Company, Conversation
from .utils import count_by_week, count_by_month

class Home(TemplateView):
    """Home page."""
    template_name = 'home.html'

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect(reverse('about'))
        return super(Home, self).dispatch(request, *args, **kwargs)

    def get_context_data(self):
        context = super(Home, self).get_context_data()
        
        ONE_QUARTER_AGO = timezone.now() - timedelta(days=91)
        ONE_YEAR_AGO = timezone.now() - timedelta(days=365)
        THREE_YEARS_AGO = timezone.now() - timedelta(days=365.24*3)
        EVER = timezone.now() - timedelta(days=100000)
        
        new_people = (Person.objects.for_user(self.request.user)
                .filter(created_on__gte=timezone.now() - timedelta(days=30))
                .order_by('-created_on'))[:4]
        conversation_list = (Conversation.objects.for_user(self.request.user).prefetch_related('people')
                .filter(seed=False))[:4]
        pings = (Person.objects.for_user(self.request.user)
                .exclude(conversations__date__gte=ONE_QUARTER_AGO)
                .filter(conversations__date__gte=THREE_YEARS_AGO)
                .annotate(
                    num_conversations=Count('conversations'),
                    last_contact=Max('conversations__date'),
                ).order_by('-num_conversations', '-last_contact'))[:4]
        
        orbit_quarter = Person.objects.filter(conversations__date__gte=ONE_QUARTER_AGO).distinct().count()
        orbit_year = Person.objects.filter(conversations__date__gte=ONE_YEAR_AGO).distinct().count()
        orbit_three_years = Person.objects.filter(conversations__date__gte=THREE_YEARS_AGO).distinct().count()
        orbit_ever = Person.objects.filter(conversations__date__gte=EVER).distinct().count()
        context.update({
            'conversation_list': conversation_list,
            'pings': pings,
            'new_people': new_people,
            'chart_period': self.request.GET.get('period', 'week'),
            'orbit_quarter': orbit_quarter,
            'orbit_year': orbit_year,
            'orbit_three_years': orbit_three_years,
            'orbit_ever': orbit_ever,
        })
        return context

class About(TemplateView):
    """About page."""
    template_name = 'about.html'

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return redirect(reverse('home'))
        return super().dispatch(request, *args, **kwargs)

class PersonList(LoginRequiredMixin, ListView):
    """List of people."""
    model = Person
    template_name = 'person/list.html'
    paginate_by = 20

    def get_filters(self):
        """Record and validate filters from the GET parameters."""
        if hasattr(self, 'filters'):
            return self.filters

        filters = {}

        sector = self.request.GET.get('sector')
        company = self.request.GET.get('company')
        city = self.request.GET.get('city')
        date = self.request.GET.get('date')

        selected_sector = None
        selected_company = None
        date_since = None
        
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

        if date:
            date_since = {
                'week': timezone.now() - timedelta(days=7),
                'month': timezone.now() - timedelta(days=30),
                'quarter': timezone.now() - timedelta(days=91),
                'year': timezone.now() - timedelta(days=365),
            }.get(date)
        
        filters['sector'] = selected_sector
        filters['company'] = selected_company
        filters['city'] = city
        filters['level'] = None
        filters['date'] = date
        filters['date_since'] = date_since
        filters['filtered'] = any([
            filters['sector'], filters['company'], filters['city'], filters['level'], filters['date'],
        ])

        self.filters = filters
        return self.filters

    def get_queryset(self):
        """Apply filters to the queryset."""
        qs = (Person.objects.for_user(self.request.user)
            .annotate(
                num_conversations=Count('conversations'),
                last_contact=Max('conversations__date')
            ).order_by('-last_contact', 'last_name', 'first_name'))
        filters = self.get_filters()

        if filters['sector']:
            qs = qs.filter(sectors=filters['sector'])
        if filters['company']:
            qs = qs.filter(company=filters['company'])
        if filters['date_since']:
            qs = qs.filter(conversations__date__gte=filters['date_since'])

        if filters['city']:
            qs = qs.filter(city__iexact=filters['city'])

        return qs

    def get_context_data(self):
        """Add extra querysets to the context."""
        context = super(PersonList, self).get_context_data()
        companies = list(set([p.company for p in Person.objects.for_user(self.request.user) if p.company]))
        companies.sort(key=lambda c: c.slug)
        cities = list(set([p.city for p in Person.objects.for_user(self.request.user) if p.city]))
        cities.sort()
        context.update({
            'sectors': Sector.objects.for_user(self.request.user),
            'companies': companies,
            'cities': cities,
            'dates': ['week', 'month', 'quarter', 'year'],
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
        messages.success(self.request, '{0} added. <a href="{1}">Add another person</a>'.format(
            form.instance.name,
            reverse('person_create'))
        )
        return super(PersonCreate, self).form_valid(form)

class PersonDelete(AccessMixin, DeleteView):
    """Page for a person."""
    model = Person
    template_name = 'person/delete.html'
    success_url = reverse_lazy('person_list')

class PersonAPI(LoginRequiredMixin, ListView):
    """Functions as a JSON API endpoint."""
    model = Person
    paginate_by = 8
    http_method_names = ['get', 'head']

    def get_queryset(self):
        """Apply search term"""
        qs = (Person.objects.for_user(self.request.user)
                .select_related('partner', 'known_via')
                .annotate(
                    num_conversations=Count('conversations'),
                    full_name=Concat('first_name', Value(' '), 'last_name'))
                .order_by('-num_conversations', 'first_name', 'last_name')
            )

        # Filter using search term
        q = self.request.GET.get('q')
        if q:
            q = q.lower().strip()
            qs = qs.filter(Q(full_name__istartswith=q) | Q(last_name__istartswith=q))
        
        return qs

    def get(self, request, *args, **kwargs):
        """Convert to JSON response"""
        self.object_list = self.get_queryset()
        context = self.get_context_data()
        people_list = list(context['object_list'])
        people = [{
            'name': p.name,
            'id': p.slug,
        } for p in people_list]

        data = {
            'page': context['page_obj'].number,
            'more_results': context['page_obj'].has_next(),
            'people': people,
        }
        return JsonResponse(data)

class ConversationList(LoginRequiredMixin, ListView):
    """List all conversations, optionally for a single person or sector."""
    model = Conversation
    template_name = 'conversations/list.html'
    paginate_by = 20

    def get_filters(self):
        """Record and validate filters from the GET parameters."""
        if hasattr(self, 'filters'):
            return self.filters

        filters = {}

        sector = self.request.GET.get('sector')
        mode = self.request.GET.get('mode')
        seeds = self.request.GET.get('seeds')
        date = self.request.GET.get('date')
        person = self.request.GET.get('person')

        selected_sector = None
        selected_person = None
        date_since = None
        
        if sector:
            try:
                selected_sector = Sector.objects.for_user(self.request.user).get(slug=sector)
            except Sector.DoesNotExist:
                pass

        if person:
            try:
                selected_person = Person.objects.for_user(self.request.user).get(slug=person)
            except Person.DoesNotExist:
                pass

        if date:
            date_since = {
                'week': timezone.now() - timedelta(days=7),
                'month': timezone.now() - timedelta(days=30),
                'quarter': timezone.now() - timedelta(days=91),
                'year': timezone.now() - timedelta(days=365),
            }.get(date)
        
        filters['sector'] = selected_sector
        filters['mode'] = mode
        filters['date'] = date
        filters['date_since'] = date_since
        filters['seeds'] = seeds == 'on' or None
        filters['person'] = selected_person
        filters['filtered'] = any([
            filters['sector'], filters['mode'], filters['seeds'], filters['date'], filters['person'],
        ])

        self.filters = filters
        return self.filters

    def get_queryset(self):
        """Apply filters to the queryset."""
        qs = Conversation.objects.for_user(self.request.user).prefetch_related('people')
        filters = self.get_filters()

        if filters['sector']:
            qs = qs.filter(people__sectors=filters['sector']).distinct()
        if filters['mode']:
            qs = qs.filter(mode__iexact=filters['mode'])
        if filters['date_since']:
            qs = qs.filter(date__gte=filters['date_since'])
        if filters['seeds']:
            qs = qs.filter(seed=True)
        if filters['person']:
            qs = qs.filter(people=filters['person'])

        return qs.distinct()

    def get_context_data(self):
        """Add extra querysets to the context."""
        context = super(ConversationList, self).get_context_data()
        people = Person.objects.for_user(self.request.user).filter(conversations__isnull=False).distinct()
        context.update({
            'sectors': Sector.objects.for_user(self.request.user),
            'people': people,
            'modes': [c for c in Conversation.MODES if c[0]],
            'dates': ['week', 'month', 'quarter', 'year'],
            'search': self.filters,
        })
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
        messages.success(self.request, 'Conversation added. <a href="{0}">Add another one</a>'.format(
            reverse('conversation_create'))
        )
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


class TrendAPI(LoginRequiredMixin, TemplateView):
    """Returns data with the trend in conversations."""
    http_method_names = ['get', 'head']

    def get(self, request, *args, **kwargs):
        """Calculate data"""
        period = request.GET.get('period', 'week')
        if period == 'week':
            data = count_by_week(Conversation.objects.for_user(self.request.user), days=90)
        else:
            data = count_by_month(Conversation.objects.for_user(self.request.user), months=12)
        return JsonResponse(data)
