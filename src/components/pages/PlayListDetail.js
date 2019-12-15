import React from "react";
import { connect } from "react-redux";

import VideoPlayer from "../modules/VideoPlayer";
import VideoListItem from "../modules/VideoListItem";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";

import { fetchPlaylistDetail, clearError } from "../../actions/app";

class PlayListDetail extends React.Component {
  componentDidMount = async () => {
    await this.props.fetchPlaylistDetail(this.props.match.params.id);
  };

  componentWillUnmount = () => {
    this.props.clearError();
  };

  renderPlaylistItems = () => {
    return this.props.playlistDetail.items.map(item => {
      return <VideoListItem key={item.id} video={item} />;
    });
  };

  fetchNextPagePlaylist = async () => {
    const { nextPageToken } = this.props.playlistDetail;
    await this.props.fetchPlaylistDetail(
      this.props.match.params.id,
      nextPageToken
    );
  };

  render() {
    return (
      <div>
        {!this.props.errorData && !this.props.playlistDetail && <Loading />}

        {this.props.errorData && (
          <ErrorMessage message={this.props.errorData} />
        )}

        {this.props.playlistDetail && (
          <div className="row">
            <div className="col-lg-8">
              <VideoPlayer video={this.props.playlistDetail[0]} />
            </div>
            <div
              className="col-lg-4"
              style={{ maxHeight: "500px", overflowY: "auto" }}
            >
              {this.renderPlaylistItems()}
              <div className="text-center">
                {this.props.playlistDetail.nextPageToken && (
                  <button
                    className="btn btn-danger"
                    style={{ width: "50%" }}
                    onClick={this.fetchNextPagePlaylist}
                  >
                    More...
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    playlistDetail: state.playlistDetail,
    error: state.error
  };
};

export default connect(mapStateToProps, { fetchPlaylistDetail, clearError })(
  PlayListDetail
);
