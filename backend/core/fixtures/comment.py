import pytest

from core.fixtures.users import user
from core.fixtures.post import post
from core.post.models import Comment

@pytest.fixture
def comment(db, user, post):
    return Comment.objects.create(author=user, post=post, body="Test Comment Body")