from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action 
from rest_framework.viewsets import ModelViewSet
from rest_framework.exceptions import MethodNotAllowed

from core.post.models import Comment, Post
from core.post.permissions import IsAuthorOrReadOnly
from core.post.serializers import CommentSerializer, PostSerializer
from core.abstract.viewsets import AbstractViewSet


class PostViewSet(AbstractViewSet):
    serializer_class = PostSerializer
    permission_classes = (IsAuthorOrReadOnly,)

    def get_queryset(self):
        return Post.objects.all()

    def get_object(self):
        obj = Post.objects.get_object_by_public_id(self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        return obj

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
        
        
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def like(self, request, pk=None):
        post = self.get_object()
        user = request.user
        
        if post.likes.filter(id=user.id).exists():
            post.likes.remove(user)
            return Response ({'status': 'unliked'}, status=status.HTTP_200_OK)
        else:
            post.likes.add(user)
            return Response({'status': 'liked'}, status=status.HTTP_200_OK)
        
        
    @action(detail=True, methods=["post"], permission_classes=[IsAuthenticated])
    def comment(self, request, pk=None):
        """
        Add a new comment to this post.
        """
        post = self.get_object()
        serializer = CommentSerializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(post=post, author=request.user)
        
        return Response(
            serializer.data, status=status.HTTP_201_CREATED
        )
        
    @action(detail=True, methods=["get"])
    def comments(self, request, pk=None):
        """
        List all comments for this post.
        """
        post = self.get_object()
        comments = post.comments.all().order_by('-created')
        serializer = CommentSerializer(comments, many=True)       
        return Response(serializer.data)
    
    @action(detail=False, url_path='by-author/(?P<user_id>[^/.]+)')
    def by_author(self, request, user_id=None):
        posts = self.get_queryset().filter(author__public_id=user_id)
        serializer = self.get_serializer(posts, many=True)
        return Response(serializer.data)
    
    
        
class CommentViewSet(ModelViewSet):
    """
    only retrieve, update and delete a single comment by public_id, not listing
    """
    serializer_class = CommentSerializer
    permission_classes = (IsAuthorOrReadOnly,)
    http_method_names = ['get', 'patch', 'delete']
    
    def get_object(self):
        return Comment.objects.get_object_by_public_id(self.kwargs['pk'])

    def list(self, request, *args, **kwargs):
        # block listing all comments via '/api/comments/' as we listed comments under a specific post
        raise MethodNotAllowed("GET")