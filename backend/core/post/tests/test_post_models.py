import pytest
from core.fixtures.users import user
from core.fixtures.post import post

from core.post.models import Post, Comment


@pytest.mark.django_db
def test_create_post(user):
    post = Post.objects.create(author=user, body='Test post body')
    assert post.body == "Test post body"
    assert post.author == user
    

@pytest.mark.django_db
def test_create_comment(user, post):
    comment = Comment.objects.create(author=user, post=post, body="Test comment body")
    assert comment.author == user
    assert comment.post == post
    assert comment.body == "Test comment body"