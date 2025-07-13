from django.db import models
from django.conf import settings

from core.abstract.models import AbstractModel, AbstractManager


class PostManager(AbstractManager):
    pass


class Post(AbstractModel):
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    body = models.TextField()
    edited = models.BooleanField(default=False)
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_posts', blank=True)
    
    objects = PostManager()
    
    def __str__(self):
        return f"{self.author.name}"
    
    class Meta:
        db_table = 'core_post'


class CommentManager(AbstractManager):
    pass        

class Comment(AbstractModel):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    body = models.TextField()
    edited = models.BooleanField(default=False)
    
    objects = CommentManager()
    
    def __str__(self):
        return f"Comment by {self.author.username}"