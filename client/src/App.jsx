import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Homepage } from "./pages/Homepage";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PageNotFound } from "./pages/NoPage";
import { Private } from "./routes/Private";
import { UserProfile } from "./pages/User";
import { AdminRoute } from "./routes/AdminRoute";
import { AdminProfile } from "./pages/admin/AdminProfile";
import { Dashboard } from "./pages/admin/Dashboard";
import { UserUpdateProfile } from "./pages/UpdateProfile";
import { AdminUpdateProfile } from "./pages/admin/UpdateProfile";
import { Sendmail } from "./pages/resetPassword/Sendmail";
import { ResetPassword } from "./pages/resetPassword/ResetPassword";
import { ProfilePicUpdate } from "./pages/ProfilePicUpdate";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email" element={<Sendmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/profilepic" element={<ProfilePicUpdate />} />

        <Route path="/user" element={<Private />}>
          <Route path="profile" element={<UserProfile />} />
          <Route path="updateProfile" element={<UserUpdateProfile />} />
        </Route>

        <Route path="/admin" element={<AdminRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="updateProfile" element={<AdminUpdateProfile />} />
        </Route>

        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default App;
