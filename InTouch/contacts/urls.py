from django.urls import path
from .views import ContactAPI, ContactDetailAPI, ContactSearchAPI


urlpatterns = [
    path('contact/search/', ContactSearchAPI.as_view(), name="contactsearch"),
    path('contact/<int:pk>/', ContactDetailAPI.as_view(), name="contactdetail"),
    path('contact/', ContactAPI.as_view(), name="contact-api"),
]