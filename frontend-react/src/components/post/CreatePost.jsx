import React, { useContext, useState } from "react";
import { Button, Form, Modal, Spinner } from "react-bootstrap";
import axiosService from "../../helper/axios";
import { Context } from "../Layout";
import { useLoggedInUserSWR } from "../../helper/getUser";

const CreatePost = (props) => {
  const { refresh } = props;

  const [showModal, setShowModal] = useState(false); // Post creation modal
  const [showToxicityModal, setShowToxicityModal] = useState(false); // Toxicity modal
  const [form, setForm] = useState({ body: "", author: "" });
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toxicityReasons, setToxicityReasons] = useState([]);

  const { setToaster } = useContext(Context);
  const { loggedInUser } = useLoggedInUserSWR();

  //Show Modal
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const createPostForm = event.currentTarget;

    if (createPostForm.checkValidity() == false) {
      event.stopPropagation();
    }
    setValidated(true);

    if (!form.body) return;

    setLoading(true)

    try {
      // Check toxicity before posting
      const toxicityRes = await axiosService.post("/ai/toxicity/", {
        text: form.body,
      })

      if (toxicityRes.data.toxic) {
        setToxicityReasons(toxicityRes.data.reasons);
        setShowToxicityModal(true);
        setLoading(false);
        return;
      }

      // Create post if not toxic
      const data = {
        author: loggedInUser.id,
        body: form.body,
      };
      
      await axiosService.post("/post/", data);

      setToaster({
        show: true,
        type: "success",
        title: "Success",
        message: "Post created!",
      });
      setForm({ body: "", author: "" });
      handleClose();
      refresh();
    } catch (error) {
      console.error(error);
      setToaster({
        show: true,
        type: "danger",
        title: "Error",
        message: "Failed to create post.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Post Input */}
      <Form.Group className="my-3 w-75">
        <Form.Control
          className="py-2 rounded-pill border-primary text-primary"
          type="text"
          placeholder="Write a post"
          onClick={handleShow}
          data-testid="show-modal-form"
        />
      </Form.Group>

      {/* Post Creation Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            data-testid="create-post-form"
          >
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
            disabled={!form.body || loading}
            data-testid="create-post-submit"
          >
            {loading? <Spinner animation="border" size="sm" /> : "Post"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Toxicity Modal */}
      <Modal
        show={showToxicityModal}
        onHide={() => setShowToxicityModal(false)}
        centered
      >
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title>Toxic Content Detected</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your post cannot be created because it contains toxic content:</p>
          <ul>
            {toxicityReasons.map((reason, idx) => (
              <li key={idx}>{reason}</li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowToxicityModal(false)}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreatePost;
