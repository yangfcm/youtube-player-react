import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const renderError = (error) => {
  return (
    <div className="text-danger text-center my-3 py-3">
      <FontAwesomeIcon icon="exclamation-triangle" className="mx-2" />
      {error.displayMessage}
    </div>
  );
};

const ErrorMessage = ({ error }) => {
  // console.log(process.env);
  if (process.env.NODE_ENV === "development") {
    console.log(error);
  }
  return renderError(error);
};

export default ErrorMessage;
