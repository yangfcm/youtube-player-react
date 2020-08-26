import React from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import VideoPlayer from "../modules/VideoPlayer";
import VideoDetail from "../modules/VideoDetail";
import VideoList from "../modules/VideoList";
import CommentsList from "../modules/CommentsList";
import Loading from "../common/Loading";
import MoreButton from "../modules/MoreButton";
import ErrorMessage from "../common/ErrorMessage";

import { fetchVideo } from "../../actions/video";
import { searchVideos } from "../../actions/search";
import { fetchPlaylistDetail } from "../../actions/playlist";
import { clearError } from "../../actions/error";

export class Video extends React.Component {
  state = {
    playlistDetail: null,
    video: null,
    videoId: null,
    playlistId: null,
    error: null,
  };

  componentDidMount = async () => {
    const videoId = this.props.match.params.id;
    const playlistId = queryString.parse(this.props.location.search).playlistId;
    this.setState({
      videoId,
      playlistId,
    });
    await this.props.fetchVideo(videoId);
    if (this.props.error) {
      this.setState({
        error: this.props.error,
      });
      return;
    }
    if (this.props.video) {
      this.setState({
        video: this.props.video.items[0],
      });
    }
    await this.fetchSidebarVideos();
  };

  componentDidUpdate = async (prevProps) => {
    const prevVideoId = prevProps.match.params.id;
    const videoId = this.props.match.params.id;
    const { playlistId } = this.state;
    if (prevVideoId !== videoId) {
      await this.props.fetchVideo(videoId);
      if (this.props.error) {
        this.setState({
          error: this.props.error,
        });
        return;
      }
      this.setState({
        videoId,
        video: this.props.video.items[0],
      });
      if (!playlistId) {
        this.fetchSidebarVideos();
      }
    }
  };

  componentWillUnmount = () => {
    this.props.clearError();
  };

  /**
   * Fetch the videos in sidebar: If the playing video is from a playlist, the sidebar shows videos in the playlist,
   * otherwise, shows the related videos
   */
  fetchSidebarVideos = async (nextPageToken) => {
    const { playlistId, videoId } = this.state;
    if (playlistId) {
      /** Fetch videos belonging to a playlist */
      if (nextPageToken) {
        await this.props.fetchPlaylistDetail(playlistId, nextPageToken);
        this.setState((state, props) => {
          return {
            playlistDetail: {
              pageInfo: props.playlistDetail.pageInfo,
              items: state.playlistDetail.items.concat(
                props.playlistDetail.items
              ),
              nextPageToken: props.playlistDetail.nextPageToken,
            },
          };
        });
      } else {
        await this.props.fetchPlaylistDetail(playlistId);
        this.setState({
          playlistDetail: this.props.playlistDetail
            ? {
                pageInfo: this.props.playlistDetail.pageInfo,
                items: this.props.playlistDetail.items,
                nextPageToken: this.props.playlistDetail.nextPageToken,
              }
            : null,
        });
      }
    } else {
      /** Fetch videos related to the playing video */
      if (nextPageToken) {
        await this.props.searchVideos(
          { relatedToVideoId: videoId, type: "video" },
          nextPageToken
        );
        this.setState((state, props) => {
          return {
            playlistDetail: {
              pageInfo: props.videos.pageInfo,
              items: state.playlistDetail.items.concat(props.videos.items),
              nextPageToken: props.videos.nextPageToken,
            },
          };
        });
      } else {
        await this.props.searchVideos({
          relatedToVideoId: videoId,
          type: "video",
        });
        this.setState({
          playlistDetail: this.props.videos
            ? {
                pageInfo: this.props.videos.pageInfo,
                items: this.props.videos.items,
                nextPageToken: this.props.videos.nextPageToken,
              }
            : null,
        });
      }
    }
  };

  fetchNextPagePlaylist = async () => {
    const { nextPageToken } = this.state.playlistDetail;
    if (!nextPageToken) {
      return;
    }
    await this.fetchSidebarVideos(nextPageToken);
  };

  render() {
    return (
      <React.Fragment>
        {!this.state.error && !this.state.video && <Loading />}
        {this.state.error && <ErrorMessage error={this.state.error} />}
        {!this.state.error && this.state.video && (
          <div className="row justify-content-center">
            <div className="col-lg-8">
              {this.state.videoId && (
                <VideoPlayer videoId={this.state.videoId} />
              )}
              {this.state.video && <VideoDetail video={this.state.video} />}

              {/* {this.props.auth.signedIn && this.state.video && (
                <CommentForm video={this.state.video} />
              )} */}
              {this.state.videoId && (
                <CommentsList
                  video={this.state.video}
                  videoId={this.state.videoId}
                />
              )}
            </div>
            {this.state.playlistDetail && (
              <div className="col-lg-4">
                <VideoList
                  videoList={this.state.playlistDetail.items}
                  playlistId={this.state.playlistId}
                />

                {this.state.playlistDetail.nextPageToken && (
                  <MoreButton onClickMore={this.fetchNextPagePlaylist} />
                )}
              </div>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playlistDetail: state.playlist.playlistDetail,
    videos: state.search.searchResults,
    video: state.video.video,
    auth: state.auth,
    error: state.error,
  };
};

export default connect(mapStateToProps, {
  fetchPlaylistDetail,
  fetchVideo,
  searchVideos,
  clearError,
})(Video);
