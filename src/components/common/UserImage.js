import React from "react";
import DropdownMenu from "./DropdownMenu";
import { mainMenuItems } from "../../settings";

class UserImage extends React.Component {
  state = {
    showDropdownMenu: false,
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

  render() {
    const { user } = this.props;
    if (!user) {
      return false;
    }
    return (
      <div style={{ position: "relative" }} className="mr-2">
        <div
          style={{ height: "55px", cursor: "pointer" }}
          id="dropdown"
          onClick={this.handleToggleDropdown}
        >
          {"      "}
          <img
            style={{ borderRadius: "50%", maxHeight: "100%" }}
            src={user.avatar}
            alt={user.username}
          />
        </div>
        <div
          id="dropdown-container"
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
    );
  }
}

export default UserImage;
