import React from "react";
import Banner from "../layout/Banner";
import Menu from "../layout/Menu";
import { mainMenuItems } from "../../settings";

class Channel extends React.Component {
  render() {
    return (
      <div>
        <Banner />
        <Menu menuItems={mainMenuItems} />
        Channels page
      </div>
    );
  }
}

export default Channel;
