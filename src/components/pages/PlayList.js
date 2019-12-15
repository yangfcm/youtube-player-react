import React from "react";
import { connect } from "react-redux";

import Banner from "../layout/Banner";
import Menu from "../layout/Menu";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import PlayListItem from "../modules/PlayListItem";
import { mainMenuItems } from "../../settings";
import { fetchPlaylist, clearError } from "../../actions/app";

class PlayList extends React.Component {
  componentDidMount = async () => {
    if (!this.props.playlistData) {
      await this.props.fetchPlaylist();
    }
  };

  componentWillUnmount = () => {
    this.props.clearError();
  };

  renderPlayList = () => {
    return this.props.playlistData.items.map(item => {
      return <PlayListItem playlist={item} key={item.id} />;
    });
  };

  fetchNextPagePlayList = async () => {
    const { nextPageToken } = this.props.playlistData;
    await this.props.fetchPlaylist(nextPageToken);
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
        {!this.props.errorData && !this.props.playlistData && <Loading />}

        {this.props.errorData && (
          <ErrorMessage message={this.props.errorData} />
        )}

        {this.props.playlistData && (
          <div className="mt-3">
            <div className="mb-3" style={playlistStyle}>
              {this.renderPlayList()}
            </div>
            <div className="text-center">
              {this.props.playlistData.nextPageToken && (
                <button
                  className="btn btn-danger"
                  style={{ width: "50%" }}
                  onClick={this.fetchNextPagePlayList}
                >
                  More...
                </button>
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
    playlistData: state.playlist,
    errorData: state.error
  };
};

export default connect(mapStateToProps, { fetchPlaylist, clearError })(
  PlayList
);
