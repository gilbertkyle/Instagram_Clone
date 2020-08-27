from rest_framework import generics, permissions
from .serializers import RegisterSerializer, UserSerializer, LoginSerializer
from rest_framework.response import Response
from knox.models import AuthToken
from django.contrib.auth import get_user_model

User = get_user_model()


class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Login API


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

# Get User API


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class FriendAPI(generics.ListCreateAPIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        user_id = request.data.get('user_id', 0)
        friend_id = request.data.get('friend_id', 0)
        user = User.objects.get(id=user_id)
        friend = User.objects.get(id=friend_id)
        user.friends.add(friend)
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data
        })

    def get_queryset(self):
        return self.request.user.friends.all()
