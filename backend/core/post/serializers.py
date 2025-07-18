from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from core.abstract.serializers import AbstractSerializer
from core.post.models import Comment, Post
from core.user.models import User
from core.user.serializers import UserSerializer


class PostSerializer(AbstractSerializer):
    author = UserSerializer(read_only=True)
    likes_count = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ["id", "author", "body", "edited", 'likes_count', 'is_liked', 'comments_count', "created", "updated"]
        read_only_fields = ["edited"]
        
    def get_likes_count(self, obj):
        return obj.likes.count()
    
    def get_is_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(id=request.user.id).exists()
        return False
    
    def get_comments_count(self, obj):
        return obj.comments.count()
    
    
class CommentSerializer(AbstractSerializer):
    author_username = serializers.ReadOnlyField(source='author.username')
    post = serializers.UUIDField(source='post.public_id', read_only=True)
    author = serializers.UUIDField(source='author.public_id', read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'author_username', 'body', 'created']
        read_only_fields = ['post', 'author', "edited"]