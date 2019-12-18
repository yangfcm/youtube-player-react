import React from "react";
import { connect } from "react-redux";

import Banner from "../layout/Banner";
import Menu from "../layout/Menu";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import PlayListItem from "../modules/PlayListItem";
import MoreButton from "../modules/MoreButton";
import { mainMenuItems } from "../../settings";
import { fetchPlaylist, clearError } from "../../actions/app";

class PlayList extends React.Component {
  state = {
    playlist: null,
    error: null
  };
  componentDidMount = async () => {
    await this.props.fetchPlaylist();
    if (this.props.error) {
      this.setState({
        error: this.props.error
      });
      return;
    }
    if (this.props.playlist) {
      if (this.props.playlist.items.length > 0) {
        this.setState({
          playlist: {
            pageInfo: this.props.playlist.pageInfo,
            items: this.props.playlist.items,
            nextPageToken: this.props.playlist.nextPageToken
          }
        });
      } else {
        this.setState({
          error: "No Playlist in this channel"
        });
      }
    }
  };

  componentWillUnmount = () => {
    this.props.clearError();
  };

  renderPlayList = () => {
    return this.state.playlist.items.map(item => {
      return <PlayListItem playlist={item} key={item.id} />;
    });
  };

  fetchNextPagePlayList = async () => {
    const { nextPageToken } = this.props.playlistData;
    await this.props.fetchPlaylist(nextPageToken);
    this.setState((state, props) => {
      return {
        playlist: {
          pageInfo: props.playlist.pageInfo,
          items: state.playlist.items.concat(props.playlist.items),
          nextPageToken: props.playlist.nextPageToken
        }
      };
    });
  };

  render() {
    const playlistStyle = {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
      gap: "1.2rem"
    };

    return (
      <div>
        <Banner />
        <Menu menuItems={mainMenuItems} />
        {!this.props.error && !this.state.playlist && <Loading />}

        {this.props.error && <ErrorMessage message={this.props.error} />}

        {this.state.playlist && (
          <div className="mt-3">
            <h3 className="mb-2 text-primary font-weight-bold">My Play List</h3>
            <div className="mb-3" style={playlistStyle}>
              {this.renderPlayList()}
            </div>
            <div className="text-center">
              {this.state.playlist.nextPageToken && (
                <MoreButton onClickMore={this.fetchNextPagePlayList} />
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    playlist: state.playlist,
    error: state.error
  };
};

export default connect(mapStateToProps, { fetchPlaylist, clearError })(
  PlayList
);
