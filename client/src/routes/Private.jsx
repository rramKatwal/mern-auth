import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "../components/Spinner";

export const Private = () => {
  const [ok, setOk] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(`${window.location.origin}/auth/user-auth`, {
        headers: {
          Authorization: token,
        },
      });
      if (res?.data.ok) {
        setOk(true);
      } else {
        console.error("Authentication check failed", error);
        navigate("/login");
        setOk(false);
      }
    };
    if (token) {
      authCheck();
    }
  }, [token]);

  return ok ? (
    <Outlet />
  ) : (
    <>
      <h1>You must be Logged In to access this page</h1>
      <Loader />
    </>
  );
};
