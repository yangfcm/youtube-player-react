import React from "react";
import Banner from "../layout/Banner";
import Menu from "../layout/Menu";
import { mainMenuItems } from "../../settings";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Banner />
        <Menu menuItems={mainMenuItems} />
        Home
      </div>
    );
  }
}

export default Home;
