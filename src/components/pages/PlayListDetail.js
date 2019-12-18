import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import VideoList from "../modules/VideoList";
import MoreButton from "../modules/MoreButton";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";

import { fetchPlaylistDetail, clearError } from "../../actions/app";

class PlayListDetail extends React.Component {
  state = {
    playlistDetail: null
  };

  componentDidMount = async () => {
    await this.props.fetchPlaylistDetail(this.props.match.params.id);
    if (this.props.playlistDetail) {
      this.setState({
        playlistDetail: {
          pageInfo: this.props.playlistDetail.pageInfo,
          items: this.props.playlistDetail.items,
          nextPageToken: this.props.playlistDetail.nextPageToken
        }
      });
    } else {
      this.props.history.push("/not-found");
    }
  };

  componentWillUnmount = () => {
    this.props.clearError();
    this.setState({
      playlistDetail: null
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
      <React.Fragment>
        {!this.props.errorData && !this.state.playlistDetail && <Loading />}

        {this.props.errorData && (
          <ErrorMessage message={this.props.errorData} />
        )}

        {this.state.playlistDetail && (
          <div className="row justify-content-center">
            <div className="col col-md-8">
              <div className="mb-3 ">
                <h5 className="font-weight-bold">Playlist Videos</h5>
                <Link to="/playlist">&lt;&lt;Back to My Playlist</Link>
              </div>
              <VideoList
                videoList={this.state.playlistDetail.items}
                playlistId={this.props.match.params.id}
              />

              {this.state.playlistDetail.nextPageToken && (
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
    error: state.error
  };
};

export default connect(mapStateToProps, { fetchPlaylistDetail, clearError })(
  withRouter(PlayListDetail)
);
