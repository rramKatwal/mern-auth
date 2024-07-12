import React, { useState } from "react";
import { Layout } from "../components/Layout";
import { Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocationDot,
  faLock,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import "./pages.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setcPassword] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const formdata = new FormData();
      formdata.append("name", name);
      formdata.append("email", email);
      formdata.append("phone", phone);
      formdata.append("address", address);
      formdata.append("password", password);
      formdata.append("cPassword", cPassword);
      formdata.append("profileImage", image);
      const { data } = await axios.post(
        `${window.location.origin}/auth/register`,
        formdata
      );
      if (data?.success) {
        toast.success(data?.message, {
          onClose: () => navigate("/login"),
          autoClose: 2000,
        });
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
          <h1 className="text-center"> REGISTER</h1>
          <div className="row ">
            <div className="col-md-6 text-end">
              <div className="img-preview">
                {image ? (
                  <div>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      height="288px"
                      width="auto"
                      className="mb-2 img img-responsive"
                    />
                    <p>Preview of the profile picture you uploaded.</p>
                  </div>
                ) : (
                  <img
                    src="/register.png"
                    alt=""
                    height="288px"
                    className="mb-2 img img-responsive"
                  />
                )}
                <p>
                  Already have an Account? <NavLink to="/login">Login</NavLink>
                </p>
              </div>
            </div>
            <div className="col-md-6 text-start">
              <Form
                onSubmit={handlesubmit}
                action="/profile"
                method="post"
                encType="multipart/form-data"
              >
                <div className="inputbox">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <label htmlFor="name">
                    <FontAwesomeIcon icon={faUser} className="reg-icon" /> Name
                  </label>
                </div>
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
                    type="text"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <label htmlFor="phone">
                    <FontAwesomeIcon icon={faPhone} className="reg-icon" />{" "}
                    Phone
                  </label>
                </div>
                <div className="inputbox">
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                  <label htmlFor="address">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="reg-icon"
                    />{" "}
                    Address
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
                <div className="inputbox">
                  <input
                    type="password"
                    id="cpass"
                    value={cPassword}
                    onChange={(e) => setcPassword(e.target.value)}
                    required
                  />
                  <label htmlFor="cpass">
                    <FontAwesomeIcon icon={faLock} className="reg-icon" />{" "}
                    Confirm-Password
                  </label>
                </div>

                <div className="upload-profile">
                  <label
                    style={{ width: "100%" }}
                    className="btn btn-secondary"
                  >
                    {image ? image.name : "Upload Profile"}
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <Button type="submit" className="btn btn-secondary mb-2 ">
                  Register
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
