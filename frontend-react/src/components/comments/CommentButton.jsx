import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import axiosService from "../../helper/axios";
import { Context } from "../Layout";
import { CommentOutlined } from "@ant-design/icons";
import { useLoggedInUserSWR } from "../../helper/getUser";

const CommentButton = (props) => {
  const { post, refresh } = props;

  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({ body: "", post: "", author: "" });
  const [show, setShow] = useState(false);
  const { setToaster } = useContext(Context);

  const { loggedInUser, isLoading, isError } = useLoggedInUserSWR();

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const createCommentForm = event.currentTarget;

    if (createCommentForm.checkValidity() == false) {
      event.stopPropagation();
    }
    setValidated(true);

    const data = {
      author: loggedInUser.id,
      body: form.body,
    };

    axiosService
      .post(`/post/${post.id}/comment/`, data)
      .then(() => {
        handleClose();
        setForm({ body: "", author: "" });
        // toaster
        setToaster({
          show: true,
          type: "success",
          title: "Success",
          message: "Comment created!",
        });
        refresh();
        console.log("Comment created");
      })
      .catch((error) => {
        console.log(error);
        setToaster({
          show: true,
          type: "danger",
          title: "Error",
          message: "Failed to create comment.",
        });
      });
  };


  if (isLoading) {
    return (
       <>
       <p>Loading comment form</p>
       <Spinner></Spinner>
       </>
    );
  }

  if (isError) {
    return (
      <>
      <p>Error! Something is happened.</p>
      </>
    )
  }

  return (
    <>
      <Button
        variant="outline-primary"
        size="sm"
        className="me-2 pr-2 pl-2 pt-0 pb-0"
        onClick={handleShow}
      >
        <CommentOutlined style={{ paddingRight: "2px" }} />
        <small>Comment</small>
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Write a comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                name="body"
                value={form.body}
                onChange={(e) =>
                  setForm({
                    ...form,
                    body: e.target.value,
                  })
                }
                as="textarea"
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Post
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommentButton;
