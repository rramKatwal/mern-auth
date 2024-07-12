import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { Layout } from "../../components/Layout";
import "../pages.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export const Sendmail = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${window.location.origin}/auth/email`,
        {
          email,
        }
      );
      if (data?.success) {
        toast.success(data?.message, {
          onClose: () => navigate("/reset-password"),
          autoClose: 1000,
        });
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    if (user && user.email) {
      setEmail(user.email);
    }
  }, [user]);

  return (
    <>
      <Layout>
        <div className="container mt-5 register-form text-center">
          <h1>Email Verification!!</h1>
          <p>Please Enter your valid Email address below to get OTP:</p>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-8 text-start">
              <Form className="reset" onSubmit={sendOtp}>
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
                <button type="submit" className="btn btn-secondary">
                  Send OTP
                </button>
              </Form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};
