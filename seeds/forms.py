from django import forms

from crispy_forms.bootstrap import FormActions, PrependedText
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, HTML, Field, Row, Hidden

from .models import Person

class PersonForm(forms.ModelForm):
    """Form for a person."""

    def __init__(self, *args, **kwargs):
        super(PersonForm, self).__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.layout = Layout(
            Field('first_name', autofocus=""),
            'last_name', 
            'partner',
            'known_via',
            'company',
            'sectors',
            'city',
            'address',
            'birthday',
            'notes',
            Submit('submit', 'Save person'),
        )

    class Meta:
        model = Person
        fields = ['first_name', 'last_name', 'partner', 'known_via', 'company', 'sectors', 'city', 
            'birthday', 'address', 'notes']
