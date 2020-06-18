import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Banner = ({ auth }) => {
  const { signedIn, user } = auth;
  // console.log(signedIn, user);
  return (
    <div className="d-flex align-items-center mb-2">
      <div style={{ height: "80px" }} className="d-flex align-items-center">
        {signedIn === null ? (
          ""
        ) : signedIn === true ? (
          <img
            style={{ borderRadius: "50%", maxHeight: "100%" }}
            src={user.avatar}
            alt={user.username}
          />
        ) : (
          <FontAwesomeIcon icon="user-astronaut" size="3x"></FontAwesomeIcon>
        )}
      </div>
      <h3 className="display-6 mx-3">
        {signedIn === null
          ? ""
          : signedIn === true
          ? `Welcome, ${user.username}`
          : "Welcome"}
      </h3>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default connect(mapStateToProps)(Banner);
