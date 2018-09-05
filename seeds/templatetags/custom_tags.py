from django.template.defaulttags import register

@register.simple_tag
def add_param_to_url(request, field, value):
    """Add a parameter to the current URL, keeping the existing parameters."""
    dict_ = request.GET.copy()
    dict_[field] = str(value)
    return dict_.urlencode()
