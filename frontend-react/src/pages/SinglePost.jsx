import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../helper/axios";
import Layout from "../components/Layout";
import Post from "../components/post/Post";
import { Col, Image, Row } from "react-bootstrap";
import CreateComment from "../components/comments/CreateComment";
import Comment from "../components/comments/Comment";
import { randomAvatar } from "../helper/utils";

const SinglePost = () => {
  const { postId } = useParams();
  const { data: post, mutate: mutatePost } = useSWR(
    `/post/${postId}/`,
    fetcher
  );
  const { data: comments, mutate: mutateComments } = useSWR(
    `/post/${postId}/comments/`,
    fetcher
  );

  console.log("post:", post);
  console.log("comments: ", comments);

  return (
    <>
      <Layout>
        {post ? (
          <Row className="justify-content-center">
            <Col sm={8}>
              <Post post={post} refresh={mutatePost} isSinglePost></Post>
              <div className="d-flex align-items-center">
                <Image
                  src={randomAvatar()}
                  width={48}
                  height={48}
                  roundedCircle
                  className="me-3"
                />
                <CreateComment
                  post={post}
                  refresh={mutateComments}
                ></CreateComment>
              </div>
              
              {comments?.map((c) => (
                <Comment key={c.id} comment={c} refresh={mutateComments} />
              ))}
            </Col>
          </Row>
        ) : (
          <div>Loading...</div>
        )}
      </Layout>
    </>
  );
};

export default SinglePost;
