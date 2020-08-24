from rest_framework import generics, viewsets, permissions, mixins, status
from .serializers import PostSerializer, PostUploadSerializer, CommentSerializer, CommentUploadSerializer
from accounts.serializers import UserSerializer
from rest_framework.response import Response
from .models import Comment
from django.http import Http404


class PostAPI(generics.CreateAPIView):
    serializer_class = PostUploadSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        post = serializer.save()
        return Response({
            "post": PostSerializer(post, context=self.get_serializer_context()).data
        })


class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer

    permission_classes = [
        permissions.IsAuthenticated
    ]

    def get_queryset(self):
        return self.request.user.post_set.all()


class CommentAPI(generics.ListCreateAPIView):
    #queryset = Comment.objects.all()

    def get_serializer_class(self):
        if self.request.method == "GET":
            return CommentSerializer
        if self.request.method == "POST":
            return CommentUploadSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        comment = serializer.save()
        return Response({
            "comment": CommentSerializer(comment, context=self.get_serializer_context()).data
        })

    def get_queryset(self):
        post_id = self.request.query_params.get('id', -1)
        return Comment.objects.filter(post__id=post_id)
