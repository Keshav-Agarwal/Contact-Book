import os
from django.core.wsgi import get_wsgi_application
from whitenoise import WhiteNoise



os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'InTouch.settings')

application = get_wsgi_application()



