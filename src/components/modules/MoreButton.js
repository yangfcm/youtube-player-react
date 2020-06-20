import React from "react";

const MoreButton = ({ onClickMore, children }) => {
  return (
    <div className="text-center">
      <button
        className="btn btn-light"
        style={{ width: "100%" }}
        onClick={onClickMore}
      >
        <span className="text-dark">{children ? children : "More..."}</span>
      </button>
    </div>
  );
};

export default MoreButton;
