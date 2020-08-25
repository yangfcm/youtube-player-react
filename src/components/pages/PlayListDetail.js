import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import VideoList from "../modules/VideoList";
import MoreButton from "../modules/MoreButton";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";

import { fetchPlaylistDetail } from "../../actions/playlist";
import { clearError } from "../../actions/error";

export class PlayListDetail extends React.Component {
  state = {
    playlistDetail: null,
    error: null,
  };

  componentDidMount = async () => {
    await this.props.fetchPlaylistDetail(this.props.match.params.id);
    if (this.props.error) {
      this.setState({
        error: this.props.error,
      });
      return;
    }
    if (this.props.playlistDetail) {
      this.setState({
        playlistDetail: {
          pageInfo: this.props.playlistDetail.pageInfo,
          items: this.props.playlistDetail.items,
          nextPageToken: this.props.playlistDetail.nextPageToken,
        },
      });
    }
  };

  componentWillUnmount = () => {
    this.props.clearError();
    this.setState({
      playlistDetail: null,
    });
  };

  fetchNextPagePlaylist = async () => {
    const { nextPageToken } = this.state.playlistDetail;
    await this.props.fetchPlaylistDetail(
      this.props.match.params.id,
      nextPageToken
    );
    if (this.props.error) {
      this.setState({
        error: this.props.error,
      });
      return;
    }
    this.setState((state, props) => {
      return {
        playlistDetail: {
          pageInfo: props.playlistDetail.pageInfo,
          items: state.playlistDetail.items.concat(props.playlistDetail.items),
          nextPageToken: props.playlistDetail.nextPageToken,
        },
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        {!this.state.error && !this.state.playlistDetail && <Loading />}

        {this.state.error && <ErrorMessage error={this.props.error} />}

        {this.state.playlistDetail && (
          <div className="d-flex justify-content-center">
            <div className="col-lg-9">
              <div className="mb-3">
                <h5 className="font-weight-bold">Playlist Videos</h5>
              </div>
              <VideoList
                videoList={this.state.playlistDetail.items}
                playlistId={this.props.match.params.id}
              />

              {this.state.playlistDetail.nextPageToken && (
                <div style={{ width: "50%", margin: "0 auto" }}>
                  <MoreButton onClickMore={this.fetchNextPagePlaylist} />
                </div>
              )}
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playlistDetail: state.playlist.playlistDetail,
    error: state.error,
  };
};

export default connect(mapStateToProps, { fetchPlaylistDetail, clearError })(
  withRouter(PlayListDetail)
);
