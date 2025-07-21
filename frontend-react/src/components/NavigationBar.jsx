import React from "react";
import { Image } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { randomAvatar } from "../helper/utils";
import { useUserActions } from "../hooks/user.actions";
import { Link } from "react-router-dom";
import { getAvatarURL } from "../helper/avatar";
import { useLoggedInUserSWR } from "../helper/getUser";

const NavigationBar = () => {

  const { loggedInUser } = useLoggedInUserSWR();
  const userActions = useUserActions();
  const handleLogout = () => {
    userActions.logout();
  };

  console.log("Current User ",loggedInUser?.username);
  console.log("Avatar url", getAvatarURL(loggedInUser?.avatar))

  if (!loggedInUser) {
    return (<div>Loading</div>)
  }

  return (
    <div>
      <Navbar expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand className="fw-bold" as={Link} to={"/"}>
            Postgram
          </Navbar.Brand>
          <Navbar.Collapse className="justify-content-end">
            <Nav>
              <NavDropdown
                title={
                  <Image
                    src={loggedInUser.avatar? getAvatarURL(loggedInUser.avatar) : randomAvatar()}
                    roundedCircle
                    width={36}
                    height={36}
                  />
                }
              >
                <NavDropdown.Item as={Link} to={`/user/${loggedInUser.id}/`}>
                  Profile
                </NavDropdown.Item>
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
