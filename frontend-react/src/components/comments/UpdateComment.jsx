import React, { useContext, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import axiosService from "../../helper/axios";
import { Context } from "../Layout";

const UpdateComment = (props) => {
  const { comment, refresh } = props;

  const [form, setForm] = useState({ comment_body: comment.body });
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);

  const { setToaster } = useContext(Context);

  //   show Modal
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateCommentForm = e.currentTarget;

    if (updateCommentForm.checkValidity() == false) {
      e.stopPropagation();
    }
    setValidated(true);

    const data = {body: form.comment_body};

    axiosService
      .patch(`/comments/${comment.id}/`, data)
      .then((res) => {
        console.log("response from backend: ", res);
        console.log("Comment edited")
        handleClose();
        setToaster({
          show: true,
          type: "success",
          title: "Success",
          message: "Comment modified!",
        });
        refresh();
      })
      .catch((error) => {
        setToaster({
          show: true,
          type: "danger",
          title: "Error",
          message: "Failed to edit comment.",
        });
        console.log(error);
      });
  };

  return (
    <>
      <Dropdown.Item onClick={handleShow}>Edit</Dropdown.Item>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                name="body"
                value={form.comment_body}
                as="textarea"
                rows={4}
                onChange={(e) =>
                  setForm({ ...form, comment_body: e.target.value })
                }
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateComment;
