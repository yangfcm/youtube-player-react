import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
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
      { link: `${url}/videos`, exact: false, name: "Videos" },
      { link: `${url}/playlist`, exact: false, name: "Playlist" },
      { link: `${url}/intro`, exact: false, name: "Channel Intro" }
    ];
    return (
      <div>
        <Banner />
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
            <NotFound />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default ChannelDetail;
