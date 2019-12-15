import React from "react";
import Banner from "../layout/Banner";
import Menu from "../layout/Menu";
import { mainMenuItems } from "../../settings";

class PlayList extends React.Component {
  render() {
    return (
      <div>
        <Banner />
        <Menu menuItems={mainMenuItems} />
        PlayList page
      </div>
    );
  }
}

export default PlayList;
