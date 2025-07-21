from rest_framework import serializers

from core.abstract.serializers import AbstractSerializer
from core.user.models import User


class UserSerializer(AbstractSerializer):
    posts_count = serializers.SerializerMethodField()
    avatar = serializers.ImageField(required=False, allow_null=True)

    class Meta: 
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "is_active", "avatar", "posts_count", "created", "updated"]
        read_only_fields = ["is_active"]
        
    def get_posts_count(self, obj):
        return obj.posts.count()
    