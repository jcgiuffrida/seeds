"""All forms live here."""
from django import forms
from django.utils import timezone

from crispy_forms.bootstrap import Tab, TabHolder
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, HTML, Field, Row, Div, Hidden

from .models import Person, Conversation, Sector, Company

class PersonForm(forms.ModelForm):
    """Form for a person."""
    def __init__(self, *args, **kwargs):
        user = kwargs.pop('user')
        assert user, 'Cannot instantiate form without a user'
        super(PersonForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            TabHolder(
                Tab('Basic information',
                    Row(
                        Field('first_name', wrapper_class='col-6',
                            placeholder="First name", autofocus=""),
                        Field('last_name', wrapper_class='col-6',
                            placeholder='Last name'),
                        css_class='mt-3',
                    ),
                    Row(
                        Field('city', wrapper_class='col-6'),
                        Field('sectors', wrapper_class='col-6', css_class='select2-enable'),
                    ),
                    Row(
                        Div(
                            HTML('<h4>How known</h4>'),
                            css_class="col-12",
                        ),
                        Field('partner', wrapper_class='col-6', css_class='select2-enable'),
                        Field('known_via', wrapper_class='col-6', css_class='select2-enable'),
                        Field('birthday', wrapper_class='col-6', placeholder='Enter in any format'),
                        Div(
                            Field('company', css_class='select2-enable'),
                            HTML('''
                                <a class="btn btn-sm btn-outline-primary" href="{% url 'about' %}" target="_blank">
                                    <i class="fas fa-plus"></i> Add company
                                </a>'''),
                            css_class='col-6',
                        ),
                    ),
                ),
                Tab('Details',
                    Row(
                        Div(
                            HTML('<h4>Additional details</h4>'),
                            css_class="col-12 mt-3",
                        ),
                        Field('address', wrapper_class='col-6', rows=2),
                        Field('notes', wrapper_class='col-6', placeholder='Additional notes', rows=3),
                    ),
                )
            ),
            Div(
                Submit('submit', 'Save person'),
                HTML("""<a class="btn btn-danger float-right" href="{% url 'person_delete' person.slug %}">Delete</a>"""),
            ),
        )
        
        # Remove "Delete" button
        if not self.instance.pk:
            self.helper.layout.fields[1].pop()

        # Adjust fields
        self.fields['sectors'].queryset = Sector.objects.for_user(user)
        self.fields['company'].queryset = Company.objects.for_user(user)
        self.fields['partner'].queryset = Person.objects.for_user(user).exclude(pk=self.instance.pk)
        self.fields['known_via'].queryset = Person.objects.for_user(user).exclude(pk=self.instance.pk)

    class Meta:
        model = Person
        fields = ['first_name', 'last_name', 'partner', 'known_via', 'company', 'sectors', 'city', 
            'birthday', 'address', 'notes']


class ConversationForm(forms.ModelForm):
    """Form for a conversation."""
    summary = forms.CharField(max_length=64, label='')
    notes = forms.CharField(widget=forms.Textarea, required=False, label='')
    date = forms.DateField(widget=forms.widgets.DateInput(attrs={'type': 'date'}), label='')
    seed = forms.BooleanField(required=False, label='This is a seed', 
        help_text='One-way (not reciprocated)')

    def __init__(self, *args, **kwargs):
        selected_person = kwargs.pop('person', None)
        user = kwargs.pop('user')
        assert user, 'Cannot instantiate form without a user'
        super(ConversationForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Row(
                Field('people', wrapper_class='col-7 col-sm-8', css_class='select2-enable'),
                Field('date', wrapper_class='col-5 col-sm-4'),
                Field('summary', wrapper_class='col-7 col-sm-8', placeholder='Summary'),
                Field('seed', wrapper_class='pl-4-5', css_class='col-5 col-sm-4'),
                Field('notes', wrapper_class='col-7 col-sm-8', placeholder='Notes from the conversation', rows=3),
                Div(
                    Field('mode', css_class='select2-enable'),
                    Hidden('location', value=self.instance.location, placeholder='Location'), 
                    css_class='col-5 col-sm-4',
                ),
                css_class='mt-3',
            ),
            Div(
                Submit('submit', 'Save conversation'),
                HTML("""<a class="btn btn-danger float-right" href="{% url 'conversation_delete' conversation.pk %}">Delete</a>"""),
            ),
        )

        # Remove "Delete" button
        if not self.instance.pk:
            self.helper.layout.fields[1].pop()
            self.helper.layout.fields[0][0].autofocus = ''
        
        # Adjust fields
        self.fields['people'].queryset = Person.objects.for_user(user)
        self.fields['date'].initial = timezone.now()
        self.fields['people'].label = ''
        self.fields['mode'].label = ''
        if selected_person:
            self.fields['people'].initial = selected_person

    def clean_seed(self):
        """If the conversation was not over writing, it must have been reciprocated!"""
        if (self.cleaned_data['seed'] and 
            self.cleaned_data['mode'] in ['one on one', 'in group', 'skype', 'phone']):
            raise forms.ValidationError(
                "How can the conversation be unreciprocated if it was {0}?".format(
                    self.cleaned_data['mode']
                )
            )
        return self.cleaned_data['seed']

    def clean_mode(self):
        """If the conversation was with >1 person, make sure it wasn't one-on-one"""
        if self.cleaned_data['mode'] == 'one on one' and len(self.cleaned_data['people']) > 1:
            raise forms.ValidationError(
                "If the conversation was with more than one person, select \"Group\" instead."
            )
        elif self.cleaned_data['mode'] == 'in group' and len(self.cleaned_data['people']) == 1:
            raise forms.ValidationError(
                "If the conversation was with only one person, select \"One on one\" instead."
            )
        return self.cleaned_data['mode']

    class Meta:
        model = Conversation
        fields = ['people', 'mode', 'summary', 'seed', 'date', 'location', 'notes']

class CompanyForm(forms.ModelForm):
    """Form for a company."""
    def __init__(self, *args, **kwargs):
        super(CompanyForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Field('name', autofocus=""),
            Div(
                Submit('submit', 'Save company'),
            ),
        )

    class Meta:
        model = Company
        fields = ['name']

class SectorForm(forms.ModelForm):
    """Form for a sector."""
    def __init__(self, *args, **kwargs):
        super(SectorForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Field('name', autofocus=""),
            Div(
                Submit('submit', 'Save sector'),
            ),
        )

    class Meta:
        model = Sector
        fields = ['name']
