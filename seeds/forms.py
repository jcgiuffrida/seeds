from django import forms
from django.core.validators import RegexValidator

from crispy_forms.bootstrap import FormActions, Tab, TabHolder, AppendedText
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit, HTML, Field, Row, Div

from .models import Person

class PersonForm(forms.ModelForm):
    """Form for a person."""
    def __init__(self, *args, **kwargs):
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
                ),
                Tab('Details',
                    Row(
                        Div(
                            HTML('<h4>How known</h4>'),
                            css_class="col-12 mt-3",
                        ),
                        Field('partner', wrapper_class='col-6', css_class='select2-enable'),
                        Field('known_via', wrapper_class='col-6', css_class='select2-enable'),
                    ),
                    Row(
                        Div(
                            HTML('<h4>Additional details</h4>'),
                            css_class="col-12",
                        ),
                        Field('company', wrapper_class='col-6', css_class='select2-enable'),
                        Field('birthday', wrapper_class='col-6', placeholder='Enter in any format'),
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
        if not self.instance.pk:
            # Remove "Delete" button
            self.helper.layout.fields[1].pop()

    class Meta:
        model = Person
        fields = ['first_name', 'last_name', 'partner', 'known_via', 'company', 'sectors', 'city', 
            'birthday', 'address', 'notes']
