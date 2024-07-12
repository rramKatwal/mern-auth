import React, { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { addUser } from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const ProfilePicUpdate = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user.img) {
      setPreview(`${window.location.origin}/images/${user.img}`);
    }
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("profileImage", image);

      const { data } = await axios.put(
        `${window.location.origin}/users/update/image/${user.id}`,
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (data?.success) {
        dispatch(addUser({ ...user, user: data?.user, token }));
        toast.success(data?.message, {
          onClose: () => navigate(`/${user.role}/profile`),
          autoClose: 700,
        });
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <Layout>
      <div className="container register-form mt-5 text-center">
        <div className="row">
          <div className="col-md-12">
            <h1>Update Profile Picture</h1>
            <Form onSubmit={handleProfileUpdate} encType="multipart/form-data">
              {preview && (
                <div>
                  <img
                    src={preview}
                    alt="Profile Preview"
                    height="288px"
                    width="auto"
                    className="mb-2 img img-responsive"
                  />
                </div>
              )}
              <input
                type="file"
                onChange={handleImageChange}
                className="mb-2 text-center "
              />
              <br />
              <Button type="submit" className="btn btn-secondary mb-2">
                Update
              </Button>
              <Button className="btn btn-secondary mb-2 mx-3">
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
