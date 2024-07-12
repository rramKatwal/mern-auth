import React from "react";
import { Layout } from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import "./pages.css";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../features/authSlice";

export const UserProfile = () => {
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const deleteprofile = async () => {
    try {
      // Confirm the deletion before sending the request
      const confirmDelete = window.confirm(
        "Are you sure you want to delete your account?"
      );
      if (!confirmDelete) {
        return; // Exit the function if the user cancels the deletion
      }

      const res = await axios.delete(
        `${window.location.origin}/users/delete/${user.id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (res.data?.success) {
        dispatch(removeUser());
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something Went Wrong.");
    }
  };

  return (
    <>
      <Layout>
        <div className="container mt-5 register-form ">
          <h1 className="text-center m-3">{user.name} Profile</h1>
          <div className="row">
            <div className="col-md-5 text-center verticalline">
              <img
                src={`${window.location.origin}/images/${user.img}`}
                alt="profile"
                height="288px"
                style={{ borderRadius: "50%" }}
                className="img img-responsive"
              />
              <br />
              <h3 className="mt-2"> Email : {user.email}</h3>
              <button className="btn btn-secondary m-1">
                <NavLink to="/email" className="nav-link">
                  Reset Password
                </NavLink>
              </button>
            </div>

            <div className="col-md-7 text-center">
              <div className="info">Name: {user.name}</div>
              <div className="info">Phone: {user.phone}</div>
              <div className="info">Address: {user.address}</div>
              <div className="info">Role: {user.role}</div>
              <button className="btn btn-secondary mt-3">
                <NavLink to="/user/updateProfile" className="nav-link">
                  Edit Profile
                </NavLink>
              </button>
              <button
                className="btn btn-danger mt-3 mx-3"
                onClick={deleteprofile}
              >
                Delete Profile
              </button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
