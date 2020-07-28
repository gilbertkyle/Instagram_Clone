from django.urls import path
from django.views.decorators.csrf import csrf_exempt

from . import api

urlpatterns = [
    path('login', api.LoginAPI.as_view()),
    path('register', api.RegisterAPI.as_view())
]
