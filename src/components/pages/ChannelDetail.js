import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Banner from "../layout/Banner";
import Menu from "../layout/Menu";

import ChannelIntro from "./ChannelIntro";
import ChannelVideos from "./ChannelVideos";
import ChannelPlaylist from "./ChannelPlaylist";
import NotFound from "./NotFound";

class ChannelDetail extends React.Component {
  render() {
    const { path, url } = this.props.match;
    const channelMenuItems = [
      { link: `${url}/intro`, exact: false, name: "Channel Intro" },
      { link: `${url}/videos`, exact: false, name: "Videos" },
      { link: `${url}/playlist`, exact: false, name: "Playlist" }
    ];
    return (
      <Router>
        <div>
          <Banner />
          <Menu menuItems={channelMenuItems} />
          <Switch>
            <Route path={`${path}/intro`}>
              <ChannelIntro channelId={this.props.match.params.id} />
            </Route>
            <Route path={`${path}/videos`}>
              <ChannelVideos channelId={this.props.match.params.id} />
            </Route>
            <Route path={`${path}/playlist`}>
              <ChannelPlaylist channelId={this.props.match.params.id} />
            </Route>
            <Route path={`${path}`} exact>
              <Redirect to={`${url}/intro`} />
            </Route>
            <Route path={`${path}/*`}>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default ChannelDetail;
