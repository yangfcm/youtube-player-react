import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Loading = () => {
  return (
    <div className="text-center my-3 py-3">
      <FontAwesomeIcon icon="spinner" className="mx-2" />
      Loading...
    </div>
  );
};

export default Loading;
