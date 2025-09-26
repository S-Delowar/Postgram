from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action

from core.abstract.viewsets import AbstractViewSet
from core.user.models import User
from core.user.permissions import IsOwnerOrSuperuser
from core.user.serializers import UserSerializer
from rest_framework.response import Response



class UserViewSet(AbstractViewSet):
    http_method_names = ('patch', 'get')
    # permission_classes = (IsAuthenticated, IsOwnerOrSuperuser)
    serializer_class = UserSerializer
    
    def get_permissions(self):
        if self.request.method == 'GET':
            return [IsAuthenticated()]
        return [IsAuthenticated(), IsOwnerOrSuperuser()]
        
    
    def get_queryset(self):
        if self.request.user.is_superuser:
            return User.objects.all()
        return User.objects.exclude(is_superuser=True)
    
    def get_object(self):
        obj = User.objects.get_object_by_public_id(self.kwargs['pk'])
        self.check_object_permissions(self.request, obj)
        
        return obj
    
    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def me(self, request):
        serializer = UserSerializer(request.user, context={"request": request})
        return Response(serializer.data)