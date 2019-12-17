import React from "react";

const MoreButton = ({ onClickMore }) => {
  return (
    <div className="text-center">
      <button
        className="btn btn-danger"
        style={{ width: "100%" }}
        onClick={onClickMore}
      >
        More...
      </button>
    </div>
  );
};

export default MoreButton;
