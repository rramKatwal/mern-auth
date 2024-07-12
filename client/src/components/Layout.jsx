import React from "react";
import { MyNavbar } from "./Navbar";
import { Footer } from "./Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Layout = ({ children }) => {
  return (
    <>
      <MyNavbar />
      <main style={{ minHeight: "70vh" }}>
        {children}

        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
          transition:Bounce
        />
      </main>
      <Footer />
    </>
  );
};
