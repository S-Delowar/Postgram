from rest_framework import status

from core.fixtures.users import user, superuser, another_user
from core.fixtures.post import post


class TestUserViewSet:
    endpoint = '/api/user/'

    def test_superuser_can_list_all_users(self, client, superuser, user):
        client.force_authenticate(user=superuser)
        response = client.get(self.endpoint)
        
        assert response.status_code == status.HTTP_200_OK
        assert response.data["count"] == 2
        emails = [u["email"] for u in response.data["results"]]
        assert superuser.email in emails
        assert user.email in emails
        
    def test_regular_user_list_excluding_superusers(self, client, user, superuser, another_user):
        client.force_authenticate(user=user)
        response = client.get(self.endpoint)
        
        assert response.status_code == status.HTTP_200_OK
        emails = [u["email"] for u in response.data["results"]]
        assert user.email in emails
        assert another_user.email in emails 
        assert superuser.email not in emails
        
    def test_regular_user_can_get_self(self, client, user):
        client.force_authenticate(user=user)
        response = client.get(self.endpoint + str(user.public_id) + "/")

        assert response.status_code == status.HTTP_200_OK
        assert response.json()['email'] == user.email

    def test_regular_user_can_get_other_user(self, client, user, another_user):
        client.force_authenticate(user=user)
        response = client.get(self.endpoint + str(another_user.public_id) + "/")
        assert response.status_code == status.HTTP_200_OK  
        
    def test_superuser_can_get_any_user(self, client, superuser, user, another_user):
        client.force_authenticate(user=superuser)
        response = client.get(self.endpoint + str(another_user.public_id) + "/")
        
        assert response.status_code == status.HTTP_200_OK
        assert response.json()['email'] == another_user.email

    def test_regular_user_can_patch_self(self, client, user):
        client.force_authenticate(user=user)
        data = {'username': 'newusername'}
        response = client.patch(self.endpoint + str(user.public_id) + "/", data)

        assert response.status_code == status.HTTP_200_OK
        assert response.json()['username'] == 'newusername'

    def test_regular_user_cannot_patch_others(self, client, user, another_user):
        client.force_authenticate(user=user)
        
        payload = {'username': 'test_patch_user'}
        response = client.patch(self.endpoint + str(another_user.public_id) + "/", payload)

        assert response.status_code == status.HTTP_403_FORBIDDEN

    def test_unauthenticated_user_cannot_access(self, client, user):
        response = client.get(self.endpoint + str(user.public_id) + "/")
        assert response.status_code == status.HTTP_401_UNAUTHORIZED 
