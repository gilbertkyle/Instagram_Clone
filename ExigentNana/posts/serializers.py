from rest_framework import serializers
from .models import Post
from accounts.serializers import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['caption', 'image']


class PostUploadSerializer(serializers.ModelSerializer):
    author = serializers.IntegerField()

    class Meta:
        model = Post
        fields = ['caption', 'image', 'author']

    def create(self, validated_data):
        author_id = validated_data.pop('author')
        author = User.objects.get(id=author_id)

        # used Post() instead of Post.objects.create() because the post was being saved in the db without an author
        # and the model save path relies on having an author
        post = Post(**validated_data)
        post.author = author
        post.save()
        return post
