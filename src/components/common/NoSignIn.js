import React from "react";
import GoogleAuth from "../modules/GoogleAuth";

const NoSignIn = () => {
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="mb-4"></div>
      <h5 className="text-danger my-3"> You have not signed in </h5>
      <GoogleAuth />
    </div>
  );
};

export default NoSignIn;
