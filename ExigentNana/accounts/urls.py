from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from knox import views as knox_views

from . import api

urlpatterns = [
    path('', include('knox.urls')),
    path('login', api.LoginAPI.as_view()),
    path('register', api.RegisterAPI.as_view()),
    path('user', api.UserAPI.as_view()),
    path('friends', api.FriendAPI.as_view()),
    path('logout', knox_views.LogoutView.as_view(), name="knox_logout")
]
