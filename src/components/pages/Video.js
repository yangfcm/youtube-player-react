import React from "react";
import { connect } from "react-redux";
import queryString from "query-string";

import VideoPlayer from "../modules/VideoPlayer";
import VideoDetail from "../modules/VideoDetail";
import VideoList from "../modules/VideoList";
import Comments from "../modules/Comments";
import Loading from "../common/Loading";
import MoreButton from "../modules/MoreButton";
import ErrorMessage from "../common/ErrorMessage";

import { fetchVideo, fetchPlaylistDetail, clearError } from "../../actions/app";

class Video extends React.Component {
  state = {
    playlistDetail: null,
    video: null,
    videoId: null,
    playlistId: null
  };

  componentDidMount = async () => {
    const videoId = this.props.match.params.id;
    const playlistId = queryString.parse(this.props.location.search).playlistId;
    await this.props.fetchVideo(videoId);
    await this.props.fetchPlaylistDetail(playlistId);
    this.setState({
      videoId,
      playlistId,
      video: this.props.video.items[0],
      playlistDetail: {
        pageInfo: this.props.playlistDetail.pageInfo,
        items: this.props.playlistDetail.items,
        nextPageToken: this.props.playlistDetail.nextPageToken
      }
    });
  };

  componentDidUpdate = async prevProps => {
    const prevVideoId = prevProps.match.params.id;
    const videoId = this.props.match.params.id;
    if (prevVideoId !== videoId) {
      await this.props.fetchVideo(videoId);
      this.setState({
        videoId,
        video: this.props.video.items[0]
      });
    }
  };

  componentWillUnmount = () => {
    this.props.clearError();
  };

  fetchNextPagePlaylist = async () => {
    const { nextPageToken } = this.state.playlistDetail;
    if (!nextPageToken) {
      return;
    }
    await this.props.fetchPlaylistDetail(this.state.playlistId, nextPageToken);
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
      <React.Fragment>
        {this.props.error && <ErrorMessage messate={this.props.error} />}
        {!this.props.error && (
          <div className="row">
            <div className="col-lg-8">
              {this.state.videoId && (
                <VideoPlayer videoId={this.state.videoId} />
              )}
              {this.state.video && <VideoDetail video={this.state.video} />}
            </div>
            <div className="col-lg-4">
              {this.state.playlistDetail && this.state.playlistId && (
                <VideoList
                  videoList={this.state.playlistDetail.items}
                  playlistId={this.state.playlistId}
                />
              )}

              {this.state.playlistDetail &&
                this.state.playlistDetail.nextPageToken && (
                  <MoreButton onClickMore={this.fetchNextPagePlaylist} />
                )}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    playlistDetail: state.playlistDetail,
    video: state.video
  };
};

export default connect(mapStateToProps, {
  fetchPlaylistDetail,
  fetchVideo,
  clearError
})(Video);
