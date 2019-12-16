import React from "react";
import { connect } from "react-redux";

import VideoPlayer from "../modules/VideoPlayer";
import VideoListItem from "../modules/VideoListItem";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";

import { fetchPlaylistDetail, clearError } from "../../actions/app";

class PlayListDetail extends React.Component {
  state = {
    playlistDetail: null
  };

  componentDidMount = async () => {
    await this.props.fetchPlaylistDetail(this.props.match.params.id);
    this.setState({
      playlistDetail: {
        pageInfo: this.props.playlistDetail.pageInfo,
        items: this.props.playlistDetail.items,
        nextPageToken: this.props.playlistDetail.nextPageToken
      }
    });
  };

  componentWillUnmount = () => {
    this.props.clearError();
    this.setState({
      playlistDetail: null
    });
  };

  renderPlaylistItems = () => {
    return this.state.playlistDetail.items.map(item => {
      return <VideoListItem key={item.id} video={item} />;
    });
  };

  fetchNextPagePlaylist = async () => {
    const { nextPageToken } = this.state.playlistDetail;
    await this.props.fetchPlaylistDetail(
      this.props.match.params.id,
      nextPageToken
    );
    this.setState((state, props) => {
      return {
        playlistDetail: {
          pageInfo: props.playlistDetail.pageInfo,
          items: state.playlistDetail.items.concat(props.playlistDetail.items),
          nextPageToken: props.playlistDetail.nextPageToken
        }
      };
    });
  };

  render() {
    return (
      <div>
        {!this.props.errorData && !this.state.playlistDetail && <Loading />}

        {this.props.errorData && (
          <ErrorMessage message={this.props.errorData} />
        )}

        {this.state.playlistDetail && (
          <div className="row">
            <div className="col-lg-8">
              <VideoPlayer
                videoId={
                  this.state.playlistDetail.items[0].contentDetails.videoId
                }
              />
            </div>
            <div
              className="col-lg-4"
              // style={{ maxHeight: "600px", overflowY: "auto" }}
            >
              {this.renderPlaylistItems()}
              <div className="text-center">
                {this.state.playlistDetail.nextPageToken && (
                  <button
                    className="btn btn-danger"
                    style={{ width: "100%" }}
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
