from posixpath import basename
from rest_framework import routers
from rest_framework_nested.routers import NestedSimpleRouter

from core.ai.viewsets import AIUtilityViewSet
from core.post.viewsets import CommentViewSet, PostViewSet
from core.user.viewsets import UserViewSet
from core.auth.viewsets import RegisterViewSet, LoginViewSet, RefreshViewSet

router = routers.SimpleRouter()

########## USER ###########
router.register(r'user', UserViewSet, basename='user')

######### AUTH ############
router.register(r'auth/register', RegisterViewSet, basename='auth-register')
router.register(r'auth/login', LoginViewSet, basename='auth-login')
router.register(r'auth/refresh', RefreshViewSet, basename='auth-refresh')

######### POST ############
router.register(r'post', PostViewSet, basename='post')

###### Comment create and get under post #########
posts_router = NestedSimpleRouter(router, r'post', lookup='post')

######## Comment Update and Delete ############
router.register(r'comments', CommentViewSet, basename='post_comment')

######### AI Utils ############
router.register(r'ai', AIUtilityViewSet, basename="ai")

######### URLPATTERNS ########
urlpatterns = [
    *router.urls,
    *posts_router.urls,
]