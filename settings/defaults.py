"""Django settings for seeds project."""

import os
from django.urls import reverse_lazy

PROJECT_ROOT = os.path.dirname(os.path.abspath(os.path.dirname(__file__)))
MEDIA_ROOT = os.path.join(PROJECT_ROOT, '..', 'media')
MEDIA_URL = '/media/'
STATIC_ROOT = os.path.join(PROJECT_ROOT, 'static')
STATIC_URL = '/static/'
NPM_MODULES_ROOT = os.path.join(PROJECT_ROOT, '..', 'node_modules')

ROOT_URLCONF = 'seeds.urls'


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(PROJECT_ROOT, 'db.sqlite3'),
    }
}

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # admin
    'django.contrib.humanize',
    'suit',
    'django.contrib.admin',
    'django.contrib.admindocs',
    # third party apps
    'crispy_forms',
    # my apps
    'seeds',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

### THIRD PARTY PLUG-INS
CRISPY_TEMPLATE_PACK = 'bootstrap4'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'seeds.wsgi.application'

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
]

# This salt does not need to be super secret - just obfuscates IDs. This salt cannot be changed.
HASHID_FIELD_SALT = "i saw his round mouth's crimson"

LOGIN_URL = reverse_lazy('login')
LOGIN_REDIRECT_URL = reverse_lazy('home')
SESSION_COOKIE_AGE = 180*24*60*60  # six months

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'America/Chicago'
USE_I18N = False
USE_L10N = True
USE_TZ = True

###### LOGGING
# This overrides Django's default logging configuration to not email admins
# because we have sentry for that
LOGGING = {
    'version': 1,
    'disable_existing_loggers': True,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse',
        },
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s'
        },
        'simple': {
            'format': '[%(asctime)s] %(message)s',
            'datefmt': '%d/%m/%Y %H:%M:%S',
        },
    },
    'handlers': {
        'console':{
            'level': 'DEBUG',
            'filters': ['require_debug_true'],
            'class': 'logging.StreamHandler',
            'formatter': 'simple',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
        },
        'py.warnings': {
            'handlers': ['console'],
        },
    }
}


###### DJANGO DEBUG TOOLBAR
INSTALLED_APPS += ['debug_toolbar']
MIDDLEWARE += ['debug_toolbar.middleware.DebugToolbarMiddleware']

INTERNAL_IPS = [
    '127.0.0.1',
    '0.0.0.1',
]

DEBUG_TOOLBAR_PANELS = [
    'debug_toolbar.panels.timer.TimerPanel',
    'debug_toolbar.panels.request.RequestPanel',
    'debug_toolbar.panels.headers.HeadersPanel',
    # 'debug_toolbar.panels.versions.VersionsPanel',
    'debug_toolbar.panels.settings.SettingsPanel',
    'debug_toolbar.panels.sql.SQLPanel',
    'debug_toolbar.panels.templates.TemplatesPanel',
    'debug_toolbar.panels.staticfiles.StaticFilesPanel',
    # 'debug_toolbar.panels.cache.CachePanel',
    'debug_toolbar.panels.signals.SignalsPanel',
    # 'debug_toolbar.panels.logging.LoggingPanel',
    # 'ddt_request_history.panels.request_history.RequestHistoryPanel',
    'debug_toolbar.panels.redirects.RedirectsPanel',
    # 'debug_toolbar.panels.profiling.ProfilingPanel',
]

DEBUG_TOOLBAR_CONFIG = {
    'PROFILER_MAX_DEPTH': 20,
    'RESULTS_STORE_SIZE': 20,
}


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'
