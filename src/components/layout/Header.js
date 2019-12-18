import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownMenu from "../common/DropdownMenu";
import { mainMenuItems } from "../../settings";

class Header extends React.Component {
  state = {
    showDropdownMenu: false
  };

  toggleDropdownMenu = () => {
    this.setState(prevState => {
      return {
        showDropdownMenu: !prevState.showDropdownMenu
      };
    });
  };

  componentDidMount = () => {};

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
        <div className="d-flex align-items-center">
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
          <div style={{ position: "relative" }}>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={this.toggleDropdownMenu}
            >
              Menu{"      "}
              <FontAwesomeIcon icon="chevron-circle-down" />
            </button>
            <div
              style={{
                position: "absolute",
                right: "0",
                zIndex: 100,
                display: this.state.showDropdownMenu ? "block" : "none"
              }}
            >
              <DropdownMenu menuItems={mainMenuItems} />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
