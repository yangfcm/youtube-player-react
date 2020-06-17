import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Banner from "../layout/Banner";
import Menu from "../layout/Menu";

import ChannelIntro from "./ChannelIntro";
import ChannelVideos from "./ChannelVideos";
import ChannelPlaylist from "./ChannelPlaylist";
import ChannelBanner from "../layout/ChannelBanner";

class ChannelDetail extends React.Component {
  render() {
    const { path, url } = this.props.match;
    const channelMenuItems = [
      { link: `${url}/videos`, exact: false, name: "Videos", icon: "video" },
      { link: `${url}/playlist`, exact: false, name: "Playlist", icon: "list" },
      {
        link: `${url}/intro`,
        exact: false,
        name: "Channel Intro",
        icon: "info-circle",
      },
    ];
    return (
      <div>
        <ChannelBanner channelId={this.props.match.params.id} />
        <Menu menuItems={channelMenuItems} />
        <Switch>
          <Route path={`${path}/videos`}>
            <ChannelVideos channelId={this.props.match.params.id} />
          </Route>
          <Route path={`${path}/playlist`}>
            <ChannelPlaylist channelId={this.props.match.params.id} />
          </Route>
          <Route path={`${path}/intro`}>
            <ChannelIntro channelId={this.props.match.params.id} />
          </Route>
          <Route path={`${path}`} exact>
            <Redirect to={`${url}/videos`} />
          </Route>
          <Route path={`${path}/*`}>
            <Redirect to="/not-found" />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default ChannelDetail;
