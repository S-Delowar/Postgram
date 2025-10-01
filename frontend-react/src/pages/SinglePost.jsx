import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import axiosService, { fetcher } from "../helper/axios";
import Layout from "../components/Layout";
import Post from "../components/post/Post";
import { Button, Col, Image, Modal, Row, Spinner } from "react-bootstrap";
import CreateComment from "../components/comments/CreateComment";
import Comment from "../components/comments/Comment";
import { randomAvatar } from "../helper/utils";

const SinglePost = () => {
  const { postId } = useParams();

  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [summary, setSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [summaryError, setSummaryError] = useState(null);

  const { data: post, mutate: mutatePost } = useSWR(
    `/post/${postId}/`,
    fetcher
  );
  const { data: comments, mutate: mutateComments } = useSWR(
    `/post/${postId}/comments/`,
    fetcher
  );

  const { data: loggedInUser } = useSWR("/user/me/", fetcher);

  const handleSummarize = async () => {
    if (!post?.body) return;

    setLoadingSummary(true);
    setSummaryError(null);
    setShowSummaryModal(true);

    try {
      const { data } = await axiosService.post("/ai/summarize/", {
        text: post.body,
      });
      setSummary(data?.summary || "No summary available.");
    } catch (err) {
      console.error("Summarization failed:", err);
      setSummaryError(
        "Sorry, we couldn’t generate a summary. Please try again later."
      );
    } finally {
      setLoadingSummary(false);
    }
  };
  
  if (!loggedInUser) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Layout>
        {/* Summary Modal */}
        <Modal
          show={showSummaryModal}
          onHide={() => setShowSummaryModal(false)}
          centered
        >
          <Modal.Header closeButton className="bg-success text-white">
            <Modal.Title>🧠 AI Summary</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {loadingSummary && (
              <div className="d-flex justify-content-center align-items-center py-3">
                <Spinner animation="border" variant="primary" />
                <span className="ms-2">Generating summary...</span>
              </div>
            )}

            {!loadingSummary && summaryError && (
              <Alert variant="danger">{summaryError}</Alert>
            )}

            {!loadingSummary && !summaryError && summary && (
              <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                {summary}
              </div>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowSummaryModal(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        {post ? (
          <Row className="justify-content-center">
            <Col sm={8}>
              {/* Summarize Button */}
              <div className="d-flex justify-content-end mb-3">
                <Button variant="outline-primary" onClick={handleSummarize}>
                  🧾 Summarize Post
                </Button>
              </div>

              {/* Post Content */}
              <Post post={post} refresh={mutatePost} isSinglePost></Post>
              <div className="d-flex align-items-center">
                <Image
                  src={loggedInUser.avatar || randomAvatar()}
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
