import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light mb-4">
        <Link to="/" className="navbar-brand">
          <FontAwesomeIcon
            icon="video"
            size="lg"
            style={{ color: "#FF0101" }}
          />
          <span className="font-weight-bold mx-2 d-none d-sm-inline">
            FanTube{" "}
          </span>
        </Link>
        <form className="d-flex">
          <input
            type="text"
            placeholder="Search video..."
            className="form-control"
          />
          <button className="btn btn-outline-dark mx-2" type="submit">
            <FontAwesomeIcon icon="search" />
          </button>
        </form>
      </nav>
    );
  }
}

export default Header;
