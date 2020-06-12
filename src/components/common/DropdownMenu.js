import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "../modules/GoogleAuth";

const DropdownMenu = ({ menuItems = [] }) => {
  return (
    <div className="list-group">
      {menuItems.map((item) => {
        return (
          <Link
            key={item.name}
            to={item.link}
            className="list-group-item list-group-item-action"
          >
            {item.name}
          </Link>
        );
      })}
      <GoogleAuth />
    </div>
  );
};

export default DropdownMenu;
