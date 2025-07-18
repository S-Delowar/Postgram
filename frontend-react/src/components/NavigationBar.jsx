import React from "react";
import { Image } from "react-bootstrap";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { randomAvatar } from "../helper/utils";
import { useUserActions } from "../hooks/user.actions";

const NavigationBar = () => {

  const userActions = useUserActions()
  const handleLogout = () => {
        userActions.logout()
    }

  return (
    <div>
      <Navbar expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand href="#home" className="fw-bold">Postgram</Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <NavDropdown 
                title={
                  <Image src={randomAvatar()} roundedCircle width={36} height={36} />
                } 
                >
                <NavDropdown.Item href="#profile">Profile</NavDropdown.Item>
  
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
