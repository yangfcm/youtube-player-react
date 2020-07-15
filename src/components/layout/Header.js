import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DropdownMenu from "../common/DropdownMenu";
import GoogleAuth from "../modules/GoogleAuth";
import { mainMenuItems } from "../../settings";

class Header extends React.Component {
  state = {
    showDropdownMenu: false,
    search: "",
    user: null,
  };

  toggleDropdownMenu = () => {
    this.setState((prevState) => {
      return {
        showDropdownMenu: !prevState.showDropdownMenu,
      };
    });
  };

  closeDropdownMenu = () => {
    this.setState((prevState) => {
      if (prevState.showDropdownMenu) {
        return {
          showDropdownMenu: false,
        };
      }
    });
  };

  handleToggleDropdown = (e) => {
    this.toggleDropdownMenu();
    e.stopPropagation();
  };

  componentDidMount = () => {
    window.addEventListener("click", () => {
      this.closeDropdownMenu();
    });
  };

  handleSearch = (e) => {
    e.preventDefault();
    if (this.state.search.trim() === "") {
      return;
    }
    this.props.history.push(`/results?q=${this.state.search}`);
    this.setState({
      search: "",
    });
  };

  handleInput = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  handleSignin = () => {
    this.props.googleSignin();
  };

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
        <div className="flex-grow-1 d-flex align-items-center justify-content-end">
          <form className="d-flex" onSubmit={this.handleSearch}>
            <input
              type="text"
              placeholder="Search video..."
              className="form-control"
              name="search"
              value={this.state.search}
              onChange={this.handleInput}
            />
            <button className="btn btn-outline-dark mx-2" type="submit">
              <FontAwesomeIcon icon="search" />
            </button>
          </form>
          {this.props.auth.signedIn === true && (
            <div style={{ position: "relative" }} className="mr-2">
              <div
                style={{ height: "55px", cursor: "pointer" }}
                id="dropdown"
                onClick={this.handleToggleDropdown}
              >
                {"      "}
                <img
                  style={{ borderRadius: "50%", maxHeight: "100%" }}
                  src={this.props.auth.user.avatar}
                  alt={this.props.auth.user.username}
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  right: "0",
                  zIndex: 100,
                  minWidth: "150px",
                  display: this.state.showDropdownMenu ? "block" : "none",
                }}
              >
                <DropdownMenu menuItems={mainMenuItems} />
              </div>
            </div>
          )}
          {this.props.auth.signedIn === false && (
            <div
              style={{ height: "55px" }}
              className="d-flex align-items-center"
            >
              <button className="btn btn-primary" onClick={this.handleSignin}>
                <FontAwesomeIcon icon="sign-in-alt" />
                {"   "}
                Sign In
              </button>
            </div>
          )}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(withRouter(GoogleAuth(Header)));
