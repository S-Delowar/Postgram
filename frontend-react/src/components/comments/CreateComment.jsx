import React, { useContext, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { getUser } from "../../hooks/user.actions";
import axiosService from "../../helper/axios";
import { Context } from "../Layout";

const CreateComment = (props) => {
    const { post, refresh } = props

  const [validated, setValidated] = useState(false);
  const [form, setForm] = useState({ body: "", post: "", author: "" });
  const [show, setShow] = useState(false);
  const { setToaster } = useContext(Context);

  const user = getUser();

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
      author: user.id,
      body: form.body,
    };

    axiosService
      .post(`/post/${post.id}/comment/`, data)
      .then(() => {
        handleClose();
        setForm({ body: "", author: "" });
        // toaster
        setToaster({ show: true, type: "success", title: "Success", message: "Comment created!"})
        refresh();
        console.log("Comment created")
      })
      .catch((error) => {
        console.log(error);
        setToaster({ show: true, type: "danger", title: "Error", message: "Failed to create comment."})
      });

  };
    



  return (
    <>
      <Form.Group className="my-3 w-75">
        <Form.Control
          className="py-2 rounded-pill border-primary text-primary"
          type="text"
          placeholder="Write a comment"
          onClick={handleShow}
        ></Form.Control>
      </Form.Group>

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

export default CreateComment;
