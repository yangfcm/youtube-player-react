import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleAuth from "../modules/GoogleAuth";

const NoSignIn = ({ googleSignin }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="mb-4"></div>
      <h5 className="text-danger my-3"> You have not signed in </h5>
      <div style={{ height: "55px" }} className="d-flex align-items-center">
        <button className="btn btn-primary" onClick={googleSignin}>
          <FontAwesomeIcon icon="sign-in-alt" />
          {"   "}
          Sign In
        </button>
      </div>
    </div>
  );
};

export default GoogleAuth(NoSignIn);
