import { Button, Card, Dropdown, Image, Spinner } from "react-bootstrap";
import { randomAvatar } from "../../helper/utils";
import { format } from "timeago.js";
import {
  CommentOutlined,
  DislikeOutlined,
  LikeFilled,
  LikeOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import axiosService from "../../helper/axios";
import UpdatePost from "./UpdatePost";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../Layout";
import CommentButton from "../comments/CommentButton";
import { useLoggedInUserSWR } from "../../helper/getUser";

const Post = (props) => {
  const { post, refresh, isSinglePost, onProfileDetailsPage } = props;

  const { setToaster } = useContext(Context);

  const { loggedInUser, isLoading, isError } = useLoggedInUserSWR();

  const handleDelete = () => {
    axiosService
      .delete(`/post/${post.id}/`)
      .then(() => {
        console.log("Post deleted, post id:", post.id);
        setToaster({
          show: true,
          type: "danger",
          title: "Success",
          message: "Post deleted!",
        });
        refresh();
      })
      .catch((err) => {
        console.error("Error deleting post:", err);
      });
  };

  const handleLike = () => {
    axiosService
      .post(`/post/${post.id}/like/`)
      .then(() => {
        refresh();
        console.log("CLiked on Like/Unlike");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log("post author avatar in post component: ", post.author.avatar);

  if (isLoading) {
    return (
      <>
        <p>Loading profile...</p>
        <Spinner />
      </>
    );
  }

  if (isError) {
    return (
      <>
        <p>Error! Profile not loaded.</p>
      </>
    );
  }

  return (
    <>
      <Card className="my-4 shadow-sm rounded-3" data-testid="post-test">
        <Card.Body>
          {/* Post Header */}
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="d-flex align-items-center">
              <Image
                src={post.author.avatar || randomAvatar()}
                width={48}
                height={48}
                roundedCircle
                className="me-3"
              />
              <div>
                {!onProfileDetailsPage && (
                  <Link to={`/user/${post.author.id}/`}>
                    <h6 className="mb-0">{post.author.username}</h6>
                  </Link>
                )}
                {onProfileDetailsPage && (
                  <h6 className="mb-0">{post.author.username}</h6>
                )}
                <small className="text-muted">{format(post.created)}</small>
              </div>
            </div>

            {loggedInUser.username == post.author.username && (
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" bsPrefix="p-0 border-0 btn">
                  <MoreOutlined style={{ fontSize: "20px" }} />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <UpdatePost post={post} refresh={refresh} />
                  <Dropdown.Item onClick={handleDelete} className="text-danger">
                    Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>

          {/* Post Body */}
          {!isSinglePost ? (
            <Card.Text className="fs-6">
              {post.body.length > 150 ? (
                <>
                  {post.body.slice(0, 150) + "..."}
                  <div className="mb-2">
                    <Link to={`/post/${post.id}/`}>
                      <Button
                        variant="link"
                        size="sm"
                        className="p-0 text-primary"
                      >
                        Read more
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                post.body
              )}
            </Card.Text>
          ) : (
            <Card.Text className="fs-6">{post.body}</Card.Text>
          )}

          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <LikeFilled
                style={{
                  color: "#fff",
                  backgroundColor: "#0D6EFD",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "75px",
                  padding: "2px",
                  margin: "3px",
                }}
              />
              <p className="">
                <small>{post.likes_count} like</small>
              </p>
            </div>
            <div>
              {!isSinglePost && (
                <p>
                  <small>
                    <Link to={`/post/${post.id}/`} className="text-decoration-none text-reset">
                      {post.comments_count} Comment
                    </Link>
                  </small>
                </p>
              )}
            </div>
          </div>
        </Card.Body>

        {/* Post Footer */}
        <Card.Footer className="bg-white border-top d-flex justify-content-between align-items-center">
          <div>
            <Button
              variant={post.is_liked ? "primary" : "outline-primary"}
              size="sm"
              className="me-2 pr-2 pl-2 pt-0 pb-0"
              onClick={handleLike}
            >
              {post.is_liked ? (
                <div className="d-flex">
                  <DislikeOutlined style={{ paddingRight: "2px" }} />
                  <small>Unlike</small>
                </div>
              ) : (
                <div className="d-flex">
                  <LikeOutlined style={{ paddingRight: "2px" }} />
                  <small>Like</small>
                </div>
              )}
            </Button>
          </div>
          <div>
            {!isSinglePost && <CommentButton post={post} refresh={refresh} />}
          </div>
        </Card.Footer>
      </Card>
    </>
  );
};

export default Post;
