import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { getUser } from "../../hooks/user.actions";
import axiosService from "../../helper/axios";
import Toaster from "../Toaster";
import { Context } from "../Layout";

const CreatePost = (props) => {
  const { refresh } = props

  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ body: "", author: "" });
  const [validated, setValidated] = useState(false);

  const { setToaster } = useContext(Context);


  // ✅ Store user in state once
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = getUser();
    console.log(currentUser);
    setUser(currentUser);
  }, []); // ✅ Runs only once when mounted

  //Show Modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    const createPostForm = event.currentTarget;

    if (createPostForm.checkValidity() == false) {
      event.stopPropagation();
    }
    setValidated(true);

    const data = {
      author: user.id,
      body: form.body,
    };

    axiosService
      .post("/post/", data)
      .then(() => {
        handleClose();
        setForm({ body: "", author: "" });
        // toast
        setToaster({show: true, type: "success", title: "Success", message: "Post created!"})
        refresh();
        console.log("Post creation successful")
      })
      .catch((error) => {
        console.log(error);
        setToaster({show: true, type: "danger", title: "Error", message: "Failed to create post."})
      });
  };

  return (
    <div>
      <Form.Group className="my-3 w-75">
        <Form.Control
          className="py-2 rounded-pill border-primary text-primary"
          type="text"
          placeholder="Write a post"
          onClick={handleShow}
        />
      </Form.Group>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
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
    </div>
  );
};

export default CreatePost;
