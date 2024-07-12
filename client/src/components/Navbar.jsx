import React from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "./components.css";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../features/authSlice";

export const MyNavbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(removeUser());
  };
  return (
    <>
      <Navbar expand="lg" className="mynavbar">
        <Container>
          <NavLink to="/" className="nav-link">
            <Navbar.Brand> Authentication</Navbar.Brand>
          </NavLink>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {user ? (
                <>
                  <div className="profile-picture">
                    <img
                      src={`${window.location.origin}/images/${user.img}`}
                      alt=""
                    />
                  </div>
                  {user.role === "admin" ? (
                    <NavDropdown title={user.name} id="basic-nav-dropdown">
                      <NavDropdown.Item as="div">
                        <NavLink to="/admin/profile" className="nav-link">
                          Profile
                        </NavLink>
                      </NavDropdown.Item>
                      <NavDropdown.Item as="div">
                        <NavLink to="/admin/dashboard" className="nav-link">
                          Dashboard
                        </NavLink>
                      </NavDropdown.Item>
                      <NavDropdown.Item as="div">
                        <NavLink
                          to="/login"
                          className="nav-link"
                          onClick={handleLogout}
                        >
                          Logout
                        </NavLink>
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <NavDropdown title={user.name} id="basic-nav-dropdown">
                      <NavDropdown.Item as="div">
                        <NavLink to="/user/profile" className="nav-link">
                          Profile
                        </NavLink>
                      </NavDropdown.Item>
                      <NavDropdown.Item as="div">
                        <NavLink
                          to="/login"
                          className="nav-link"
                          onClick={handleLogout}
                        >
                          Logout
                        </NavLink>
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                </>
              ) : (
                <>
                  {" "}
                  <NavLink to="/login" className="nav-link">
                    Login
                  </NavLink>
                  <NavLink to="/register" className="nav-link">
                    Register
                  </NavLink>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
