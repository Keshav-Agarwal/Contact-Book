from django.db import models


GENDER = (
    ('M','Male',),
    ('F','Female',),
    ('O','Other',),
    ('m','Male',),
        ('f','Female',),
        ('o','Other',),
)


class Contact(models.Model):
    first_name = models.CharField("First Name", max_length=30)
    last_name = models.CharField("Last Name", max_length=30, default=None, blank=True, null = True)
    job_title = models.CharField("Job Title", max_length=20, default=None, blank=True, null = True)
    phone1 = models.CharField("Phone", max_length=20, default=None)
    phone2 = models.CharField("Phone 2", max_length=20, default=None, blank=True, null = True)
    phone3 = models.CharField("Phone 3", max_length=20, default=None, blank=True, null = True)
    gender = models.CharField("Gender", choices=GENDER, max_length=1, default='O')
    email = models.EmailField("E-mail Address", default=None, blank=True, null = True)
    home_address = models.CharField("Home Address", max_length=200, default=None, blank=True, null = True)
    city = models.CharField("City", max_length=25, default=None, blank=True, null = True)
    organization = models.CharField("Organization", max_length=15, default=None, blank=True, null = True)
    img_src = models.CharField("Business Address", max_length=200, default='https://imgur.com/a/WbbsBB6', blank=True, null = True)





