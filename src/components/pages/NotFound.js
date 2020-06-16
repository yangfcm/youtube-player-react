import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Error from "../common/ErrorMessage";

class NotFound extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Error message="The page you requested doesn't exist" />
        <div className="text-center">
          <Link to="/" className="btn btn-outline-info">
            <FontAwesomeIcon icon={"home"} />
            {"   "}
            Back to Homepage
          </Link>
        </div>
      </React.Fragment>
    );
  }
}

export default NotFound;
