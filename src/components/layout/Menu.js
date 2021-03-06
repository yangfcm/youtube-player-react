import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Menu = ({ menuItems = [] }) => {
  return (
    <div>
      <nav className="nav nav-tabs nav-fill">
        {menuItems.map((item) => {
          return (
            <NavLink
              key={item.name}
              to={item.link}
              exact={item.exact}
              className="nav-item nav-link"
              activeClassName="active"
            >
              <FontAwesomeIcon icon={item.icon} />
              {"   "}
              {item.name}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Menu;
