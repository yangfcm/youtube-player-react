import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GoogleAuth from "../modules/GoogleAuth";

const DropdownMenu = ({ menuItems = [], googleSignout }) => {
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
      <li
        style={{ cursor: "pointer" }}
        className="list-group-item list-group-item-warning"
        onClick={googleSignout}
      >
        <FontAwesomeIcon icon="sign-out-alt" />
        {"   "}
        Sign out
      </li>
    </div>
  );
};

export default GoogleAuth(DropdownMenu);
