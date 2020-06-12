import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
            <FontAwesomeIcon icon={item.icon} />
            {"   "}
            {item.name}
          </Link>
        );
      })}
      <GoogleAuth />
    </div>
  );
};

export default DropdownMenu;
