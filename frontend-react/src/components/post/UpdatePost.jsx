import React, { useContext, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import axiosService from "../../helper/axios";
import { Context } from "../Layout";

const UpdatePost = (props) => {
  const { post, refresh } = props;
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ body: post.body });
  const [validated, setValidated] = useState(false);

  const { setToaster } = useContext(Context);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const updatePostForm = event.currentTarget;

    if (updatePostForm.checkValidity() == false) {
      event.stopPropagation();
    }
    setValidated(true);

    const data = {
      body: form.body,
    };

    axiosService
      .patch(`/post/${post.id}/`, data)
      .then((res) => {
        console.log("response from backend: ", res);
        console.log("Post updated. Post id: ", post.id);
        setToaster({
          show: true,
          type: "success",
          title: "Success",
          message: "Post modified!",
        });
        handleClose();
        refresh();
      })
      .catch((error) => {
        console.log(error);
        setToaster({
          show: true,
          type: "danger",
          title: "Error",
          message: "Failed tp modify post.",
        });
      });
  };

  return (
    <div>
      <Dropdown.Item onClick={handleShow} data-testid="show-modal-form">
        Modify
      </Dropdown.Item>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit} data-testid="update-post-form">
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
                data-testid="post-body-field"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleSubmit}
            data-testid="update-post-submit"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UpdatePost;
