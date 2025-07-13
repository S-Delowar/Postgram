from rest_framework import status

from core.fixtures.users import user
from core.fixtures.post import post
from core.fixtures.comment import comment


class TestForComments:
    endpoint_post = '/api/post/'
    endpoint_comment = '/api/comments/'
    
    # Tests For Authenticated Users
    def test_list(self, client, user, post, comment):
        """Listing under a post"""
        client.force_authenticate(user=user)
        response = client.get(self.endpoint_post + str(post.public_id.hex) + "/comments/")
        # print(f"Comments: {response.data}")
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1
        
    def test_retrieve(self, client, user, post, comment):
        """Retrieve single comment by its uuid via /api/comments/{uuid/}"""
        client.force_authenticate(user=user)
        response = client.get(self.endpoint_comment + str(comment.public_id.hex) + "/")
        print(f"Response data: {response.data}")
        assert response.status_code == status.HTTP_200_OK
        assert response.data['id'] == comment.public_id.hex
        assert response.data['body'] == comment.body
        assert response.data['post'] == str(comment.post.public_id)
        assert response.data['author'] == str(comment.author.public_id)
        
    def test_create(self, client, user, post):
        """Creating post via /api/post/{post_id}/comment"""
        client.force_authenticate(user=user)
        data = {
            "body": "Test post body",
            "author": user.public_id.hex,
            "post": post.public_id.hex
        }
        response = client.post(self.endpoint_post + str(post.public_id) + "/comment/", data)
        print(f"Response data: {response.data}")
        
        assert response.status_code == status.HTTP_201_CREATED
        assert response.data['body'] == data["body"]
        assert response.data["author"] == str(user.public_id)
        assert response.data["post"] == str(post.public_id)
        
    def test_update(self, client, user, post, comment):
        """Update a comment by its author via /api/comments/{public_id}"""
        client.force_authenticate(user=user)
        data = {
            "body": "Updated Comment Body 1234",
        }
        response = client.patch(self.endpoint_comment + str(comment.public_id) + "/", data)
        assert response.status_code == status.HTTP_200_OK
        assert response.data['body'] == data['body']
    
        
    def test_delete(self, client, user, post, comment):
        """delete a comment by its author via /api/comments/{public_id}"""
        client.force_authenticate(user=user)
        response = client.delete(self.endpoint_comment + str(comment.public_id) + "/")
        assert response.status_code == status.HTTP_204_NO_CONTENT
        
    
#     # Tests For Anonymous Users:

    def test_list_anonymous(self, client, post, comment):
        """List comments under a specific post"""
        response = client.get(self.endpoint_post + str(post.public_id) + "/comments/")
        print(f"res: {response.data}")
        assert response.status_code == status.HTTP_200_OK
        assert len(response.data) == 1 
        
    def test_retrieve_anonymous(self, client, post, comment):
        response = client.get(self.endpoint_comment + str(comment.public_id) + "/")
        assert response.status_code == status.HTTP_200_OK
        assert response.data['id'] == comment.public_id.hex
        assert response.data['body'] == comment.body
        assert response.data['author'] == str(comment.author.public_id)
        assert response.data['post'] == str(comment.post.public_id)
        
    def create_anonymous(self, client, post):
        """Comment creation route /api/post/{post_id}/comment/"""
        data = {
            "body": "Test post body",
            "author": "test_user"
        }
        response = client.post(self.endpoint_post, str(post.public_id) + "/comment/", data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        
    def test_update_anonymous(self, client, comment):
        data = {
            "body": "Test comment updated body",
        }
        response = client.patch(self.endpoint_comment + str(comment.public_id) + "/", data)
        assert response.status_code == status.HTTP_401_UNAUTHORIZED
        
    def test_delete_anonymous(self, client, comment):
        response = client.delete(self.endpoint_comment + str(comment.public_id) + "/")
        assert response.status_code == status.HTTP_401_UNAUTHORIZED