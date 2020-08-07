from rest_framework import generics
from .serializers import PostSerializer, PostUploadSerializer
from rest_framework.response import Response


class PostAPI(generics.CreateAPIView):
    serializer_class = PostUploadSerializer

    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        post = serializer.save()
        return Response({
            "post": PostSerializer(post, context=self.get_serializer_context()).data
        })
