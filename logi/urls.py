from django.urls import path

from . import views

urlpatterns = [
    # Landing pages (outside, no login)
    path('', views.LandingPage.as_view(), name="landing"),
    path('login/', views.Login.as_view(), name="login"),
    path('registration/', views.Login().registration, name="registration"),
    path('dash/', views.Dashboard.as_view(), name="dash"),
    path('contact/', views.LandingPage().get_contact_page, name="contact"),
    path('services/', views.LandingPage().get_service_page, name="services"),
    path('about/', views.LandingPage().get_about_page, name="about"),

    # Dash urls 
]