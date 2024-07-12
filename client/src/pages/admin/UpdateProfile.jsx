import { faLocationDot, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Layout } from "../../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../features/authSlice";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

export const AdminUpdateProfile = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${window.location.origin}/users/update/${user.id}`,
        { name, address },
        { headers: { Authorization: token } }
      );
      if (data?.success) {
        dispatch(addUser({ ...user, user: data?.user, token }));
        toast.success(data?.message, {
          onClose: () => navigate(`/${user.role}/profile`),
          autoClose: 2000,
        });
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something Went Wrong.");
    }
  };

  useEffect(() => {
    if (user) {
      const { name, address, img } = user;
      setAddress(address);
      setName(name);
      setImage(img);
    }
  }, [user]);

  return (
    <Layout>
      <div className="container mt-5 register-form">
        <h1 className="text-center"> Update Profile</h1>
        <div className="row ">
          <div className="col-md-6 text-end">
            <div className="img-preview">
              {image && (
                <img
                  src={`${window.location.origin}/images/${image}`}
                  alt="profile"
                  height="288px"
                  style={{ borderRadius: "50%" }}
                />
              )}
            </div>
            <br />
            <Button type="submit" className="btn btn-secondary mb-2 mx-3 ">
              <NavLink to={`/profilepic`} className="nav-link">
                Edit Profile
              </NavLink>
            </Button>
          </div>
          <div className="col-md-6 text-start">
            <Form onSubmit={handlesubmit}>
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
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <label htmlFor="address">
                  <FontAwesomeIcon icon={faLocationDot} className="reg-icon" />
                  Address
                </label>
              </div>

              <Button type="submit" className="btn btn-secondary mb-2  ">
                Update
              </Button>
              <Button type="submit" className="btn btn-secondary mb-2 mx-3 ">
                <NavLink to={`/${user.role}/profile`} className="nav-link">
                  Back
                </NavLink>
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
};
