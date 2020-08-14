from django.contrib import admin
from .models import Post

# Register your models here.


class PostAdmin(admin.ModelAdmin):
    #readonly_fields = ("id",)
    list_display = ["id", "author", "caption", "image", 'show_comments']

    def show_comments(self, obj):
        return "\n".join([a.comment for a in obj.comments.all()])


admin.site.register(Post, PostAdmin)
