import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import LoginForm from "../components/authentication/LoginForm";

const Login = () => {
  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light py-4">
      <Row className="w-100 justify-content-center">
        <Col md={10} lg={8}>
          <Card className="shadow-lg border-0">
            <Card.Body className="p-0">
              <Row className="g-0">
                {/* Left Side: Welcome Content */}
                <Col md={6} className="d-flex align-items-center bg-white rounded-start p-4 p-md-5">
                  <div className="content text-center w-100">
                    <h1 className="text-primary fw-bold mb-4">Welcome to Postman!</h1>
                    <p className="text-muted lh-lg">
                      This is a new social media site that will allow you to share your thoughts and experiences with your friends. Login now and start enjoying!
                    </p>
                    <p className="text-muted">
                      Or if you don't have an account, please{" "}
                      <Link to="/registration" className="text-primary fw-bold text-decoration-none">
                        register here
                      </Link>
                      .
                    </p>
                  </div>
                </Col>

                {/* Right Side: Login Form */}
                <Col md={6} className="bg-light rounded-end p-4 p-md-5">
                  <LoginForm />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
