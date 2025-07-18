import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const Toaster = (props) => {
  const { title, message, showToast, onClose, type } = props;

  return (
    <div>
      <ToastContainer position="middle-center">
        <Toast
          onClose={onClose}
          show={showToast}
          delay={3000}
          autohide
          bg={type}
        >
          <Toast.Header closeButton={false}>
            <strong>{title}</strong>
          </Toast.Header>
          <Toast.Body className="text-white">{message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Toaster;
