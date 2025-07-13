import pytest

from core.fixtures.users import user
from core.post.models import Post


@pytest.fixture
def post(db, user):
    return Post.objects.create(
        author = user,
        body = "Test post body"
    )