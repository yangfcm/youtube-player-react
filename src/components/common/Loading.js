import React from "react";

const Loading = () => {
  return (
    <div className="text-center my-3 py-3">
      <div className="spinner-border text-center" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div>Loading...</div>
    </div>
  );
};

export default Loading;
