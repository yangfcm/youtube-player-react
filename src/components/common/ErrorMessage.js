import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ErrorMessage = ({ message }) => {
  return (
    <div className="text-danger text-center my-3 py-3">
      <FontAwesomeIcon icon="exclamation-triangle" className="mx-2" />
      {message || "Error occurred!"}
    </div>
  );
};

export default ErrorMessage;
