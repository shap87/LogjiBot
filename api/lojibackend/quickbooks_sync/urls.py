from django.urls import include, path

from . import views

app_name = 'quickbooks_sync'


urlpatterns = [
    path('sync/', views.sync)
    # path('rest-auth/', include('rest_auth.urls')),
]
