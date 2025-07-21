import React, { useContext, useState } from "react";
import { Button, Form } from "react-bootstrap";
import axiosService from "../helper/axios";
import { Context } from "../components/Layout";
import { useNavigate } from "react-router-dom";

const UpdateProfileForm = (props) => {
  const { profileUser, refresh } = props;

  const [validated, setValidated] = useState(false);

  const [form, setForm] = useState({
    first_name: profileUser.first_name,
    last_name: profileUser.last_name,
    avatar: profileUser.avatar,
  });
  const [error, setError] = useState(null);

  const { setToaster } = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateProfileForm = event.currentTarget;

    if (updateProfileForm.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);

    const data = {
      first_name: form.first_name,
      last_name: form.last_name,
      avatar: form.avatar,
    };

    console.log(data);

    //Handle patch to update user profile
    axiosService
      .patch(`/user/${profileUser.id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        refresh();
        setToaster({
          show: true,
          type: "success",
          title: "Success",
          message: "Profile updated!",
        });
        navigate(`/user/${profileUser.id}/`);
      })
      .catch((error) => {
        setToaster({
          show: true,
          type: "danger",
          title: "Error",
          message: "Failed to update profile",
        });
        console.log(error);
      });
  };

  return (
    <>
      <Form
        id="profile-update-form"
        className="border p-4 rounded"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <Form.Group className="mb-3">
          <Form.Label>Profile Photo</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setForm({ ...form, avatar: e.target.files[0] })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={form.first_name}
            onChange={(e) => setForm({ ...form, first_name: e.target.value })}
            required
            type="text"
            placeholder="Enter first name"
          />
          <Form.Control.Feedback type="invalid">
            This field is required
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            value={form.last_name}
            onChange={(e) => setForm({ ...form, last_name: e.target.value })}
            required
            type="text"
            placeholder="Enter last name"
          />
          <Form.Control.Feedback type="invalid">
            This field is required
          </Form.Control.Feedback>
        </Form.Group>

        <div className="text-content text-danger">
          {error && <p>{error}</p>}
        </div>

        <Button variant="primary" type="submit">
          Save changes
        </Button>
      </Form>
    </>
  );
};

export default UpdateProfileForm;
