from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    friends = models.ManyToManyField(User)

    def __str__(self):
        return self.username


class Post(models.Model):
    user = models.ForeignKey(User)
    caption = models.CharField(max_length=100, required=True)
    image = models.ImageField(blank=False, null=False)
    created = models.DateTimeField(auto_now_add=True)
