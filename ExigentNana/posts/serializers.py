from rest_framework import serializers
from .models import Post, Comment
from accounts.serializers import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['caption', 'image', 'id']


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


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    post = PostSerializer()

    class Meta:
        model = Comment
        fields = ["comment", "date_created", "author", "post"]


class CommentUploadSerializer(serializers.ModelSerializer):
    author = serializers.IntegerField()
    post = serializers.IntegerField()

    class Meta:
        model = Comment
        fields = ["comment", "date_created", "author", "post"]

    def create(self, validated_data):
        author_id = validated_data.pop('author')
        post_id = validated_data.pop('post')
        author = User.objects.get(id=author_id)
        post = Post.objects.get(id=post_id)

        comment = Comment(**validated_data)
        comment.author = author
        comment.post = post
        comment.save()
        return comment
