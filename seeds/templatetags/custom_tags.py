"""Custom tags for templates."""
from django.template.defaulttags import register
from django.utils import timezone

@register.simple_tag
def add_param_to_url(request, field, value):
    """Add a parameter to the current URL, keeping the existing parameters."""
    dict_ = request.GET.copy()
    dict_[field] = str(value)
    return dict_.urlencode()

@register.filter
def within_days(time, days):
    """Check for a datetime is within the past `days` days; return True if yes."""
    return time + timezone.timedelta(days=days) > timezone.today()
