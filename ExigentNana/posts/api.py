from rest_framework import generics, viewsets, permissions, mixins
from .serializers import PostSerializer, PostUploadSerializer, CommentSerializer, CommentUploadSerializer
from rest_framework.response import Response


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


class PostCommentAPI(generics.CreateAPIView):
    serializer_class = CommentUploadSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        comment = serializer.save()
        return Response({
            "comment": CommentSerializer(comment, context=self.get_serializer_context()).data
        })
