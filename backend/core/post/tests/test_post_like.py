from rest_framework import status

from core.fixtures.users import user, another_user
from core.fixtures.post import post
from core.post.serializers import PostSerializer


class TestPostLike:
    endpoint = '/api/post/'
    
    def test_authenticated_user_can_like_unlike_post(self, client, user, another_user, post):
        client.force_authenticate(another_user)
        # like the post
        response = client.post(self.endpoint + str(post.public_id) + "/like/")
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data["status"] == "liked"
        
        post.refresh_from_db()
        assert post.likes.filter(id=another_user.id).exists()
        assert post.likes.count() == 1
        
        # now unlike the post
        response = client.post(self.endpoint + str(post.public_id) + "/like/")
        assert response.status_code == status.HTTP_200_OK
        assert response.data["status"] == "unliked"
        
        post.refresh_from_db()
        assert not post.likes.filter(id=another_user.id).exists()
        assert post.likes.count() == 0