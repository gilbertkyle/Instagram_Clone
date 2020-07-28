from django.shortcuts import render
from rest_framework import generics
from .serializers import PostSerializer

# Create your views here.


class PostImage(generics.ListCreateAPIView):
    serializer_class = PostSerializer
