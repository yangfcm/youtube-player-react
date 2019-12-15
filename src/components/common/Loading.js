import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loading = () => {
  return (
    // <div className="text-center my-3 py-3">
    //   <FontAwesomeIcon icon="spinner" className="mx-2" />
    //   Loading...
    // </div>
    <div className="text-center my-3 py-3">
      <div className="spinner-border text-center" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div>Loading...</div>
    </div>
  );
};

export default Loading;
