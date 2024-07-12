import React from "react";
import { Layout } from "../components/Layout";
import { useSelector } from "react-redux";

export const Homepage = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <>
      <Layout>
        {user ? (
          <>
            <div className="container register-form text-center mt-5">
              <h1>
                Welcome to my creation : <br />
                <span style={{ color: "aqua" }}>{user.name}</span>
              </h1>
              <img src="/welcome.png" alt="welcome " height="288px" />
            </div>
          </>
        ) : (
          <>
            <div className="container register-form text-center mt-5">
              <h1>Welcome to my creation</h1>
              <img src="/welcome.png" alt="welcome " height="288px" />
            </div>
          </>
        )}
      </Layout>
    </>
  );
};
