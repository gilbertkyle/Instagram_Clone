from django.urls import path
from . import api
from rest_framework import routers

router = routers.DefaultRouter()
router.register('all', api.PostViewSet, 'posts')

urlpatterns = [
    path('', api.PostAPI.as_view()),
    path('comment', api.CommentAPI.as_view())
]


urlpatterns += router.urls
