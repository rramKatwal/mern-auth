import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { Loader } from "../components/Spinner";

export const AdminRoute = () => {
  const [ok, setOk] = useState(false);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const adminAuth = async () => {
      const res = await axios.get(`${window.location.origin}/auth/admin-auth`, {
        headers: {
          Authorization: token,
        },
      });
      if (res?.data.ok) {
        setOk(true);
      } else {
        console.error("Access denied", error);
        setOk(false);
      }
    };
    if (token) adminAuth();
  }, [token]);
  return ok ? (
    <Outlet />
  ) : (
    <>
      <h1>You must be Logged In as admin to access this page</h1>
      <Loader />;
    </>
  );
};
