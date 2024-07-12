import React from "react";
import { Layout } from "../components/Layout";

export const PageNotFound = () => {
  return (
    <>
      <Layout>
        <div className="container register-form text-center mt-5">
          <img src="/notfound.png" alt="not found " height="288px" />
          <h1>Page you requested could not be found</h1>
        </div>
      </Layout>
    </>
  );
};
