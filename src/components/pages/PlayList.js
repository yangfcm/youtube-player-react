import React from "react";
import { connect } from "react-redux";

import Banner from "../layout/Banner";
import Menu from "../layout/Menu";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import PlayListItem from "../modules/PlayListItem";
import MoreButton from "../modules/MoreButton";
import NoSignedIn from "../common/NoSignIn";
import { mainMenuItems } from "../../settings";
import { fetchPlaylist } from "../../actions/playlist";
import { clearError } from "../../actions/error";

export class PlayList extends React.Component {
  state = {
    playlist: null,
    error: null,
  };
  componentDidMount = () => {
    if (this.props.auth.signedIn) {
      this.fetchPlaylistData();
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    /** Switch to sign in */
    if (this.props.auth.signedIn && !prevProps.auth.signedIn) {
      this.props.clearError();
      this.fetchPlaylistData();
    }

    /** Sign out */
    if (!this.props.auth.signedIn && prevProps.auth.signedIn) {
      this.setState({
        playlist: null,
        error: null,
      });
    }
  };

  componentWillUnmount = () => {
    this.props.clearError();
  };

  fetchPlaylistData = async (nextPageToken = null) => {
    const accessToken = localStorage.getItem("access_token");
    await this.props.fetchPlaylist(nextPageToken, null, accessToken);
    if (this.props.error) {
      this.setState({
        error: this.props.error,
      });
      return;
    }
    if (this.props.playlist) {
      if (nextPageToken) {
        this.setState((state, props) => {
          return {
            playlist: {
              pageInfo: props.playlist.pageInfo,
              items: state.playlist.items.concat(props.playlist.items),
              nextPageToken: props.playlist.nextPageToken,
            },
          };
        });
      } else {
        if (this.props.playlist.items.length === 0) {
          this.setState({
            error: { displayMessage: "No Playlist in this channel" },
          });
        } else {
          this.setState({
            playlist: {
              pageInfo: this.props.playlist.pageInfo,
              items: this.props.playlist.items,
              nextPageToken: this.props.playlist.nextPageToken,
            },
          });
        }
      }
    }
  };

  renderPlayList = () => {
    return this.state.playlist.items.map((item, index) => {
      return <PlayListItem playlist={item} key={index} />;
    });
  };

  fetchNextPagePlayList = async () => {
    const { nextPageToken } = this.state.playlist;
    await this.fetchPlaylistData(nextPageToken);
  };

  render() {
    const playlistStyle = {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
      gap: "1.2rem",
    };
    const { signedIn } = this.props.auth;

    return (
      <div>
        <Banner />
        <Menu menuItems={mainMenuItems} />
        {signedIn === null && ""}
        {signedIn === false && <NoSignedIn />}
        {signedIn && !this.state.error && !this.state.playlist && <Loading />}

        {signedIn && this.state.error && (
          <ErrorMessage error={this.state.error} />
        )}

        {this.state.playlist && (
          <div className="mt-3">
            <h3 className="mb-2 text-primary font-weight-bold">My Play List</h3>
            <div className="mb-3" style={playlistStyle}>
              {this.renderPlayList()}
            </div>
            <div className="text-center">
              {this.state.playlist.nextPageToken && (
                <div
                  className="mt-3"
                  style={{ width: "50%", margin: "0 auto" }}
                >
                  <MoreButton onClickMore={this.fetchNextPagePlayList} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist.playlist,
    error: state.error,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { fetchPlaylist, clearError })(
  PlayList
);
