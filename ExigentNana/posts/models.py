from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()


def user_directory_path(instance, filename):
    # puts user images into their own file based on the user id
    # instance refers to the model instance
    return f"user_{instance.author.id}/{filename}"


class Post(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    caption = models.CharField(max_length=100)
    image = models.ImageField(blank=False, null=False,
                              upload_to=user_directory_path)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Author: {self.author}\nCaption: {self.caption}"
