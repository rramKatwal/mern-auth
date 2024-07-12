import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import "./pages.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../features/authSlice";
import { toast } from "react-toastify";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${window.location.origin}/auth/login`,
        {
          email,
          password,
        }
      );

      if (data?.success) {
        toast.success(data?.message);
        dispatch(addUser({ user: data?.User, token: data?.token }));
        navigate("/");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Layout>
        <div className="container mt-5 register-form">
          <h1 className="text-center"> LOGIN</h1>
          <div className="row ">
            <div className="col-md-6 text-end">
              <div className="img-preview">
                <img
                  src="/register.png"
                  alt=""
                  height="288px"
                  className="mb-2 img img-responsive"
                />
              </div>
            </div>
            <div className="col-md-6 text-start">
              <Form className="login-form" onSubmit={handleSubmit}>
                <div className="inputbox">
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <label htmlFor="email">
                    <FontAwesomeIcon icon={faEnvelope} className="reg-icon" />{" "}
                    Email
                  </label>
                </div>

                <div className="inputbox">
                  <input
                    type="password"
                    id="pass"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="pass">
                    <FontAwesomeIcon icon={faLock} className="reg-icon" />{" "}
                    Password
                  </label>
                </div>

                <p>
                  <NavLink to="/email">Forget Password ?</NavLink>
                </p>
                <p>
                  Do not have an Account?{" "}
                  <NavLink to="/register">Register</NavLink>
                </p>

                <Button type="submit" className="btn btn-secondary mb-2 mt-3 ">
                  Login
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
