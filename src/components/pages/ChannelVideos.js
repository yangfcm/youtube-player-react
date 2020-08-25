import React from "react";
import { connect } from "react-redux";
import VideoGrid from "../modules/VideoGrid";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import MoreButton from "../modules/MoreButton";
import { searchVideos } from "../../actions/search";
import { clearError } from "../../actions/error";

export class ChannelVideos extends React.Component {
  state = {
    videos: null,
    error: null,
  };

  componentDidMount = async () => {
    const { channelId } = this.props;
    await this.props.searchVideos({ channelId, order: "date", type: "video" });
    if (this.props.error) {
      this.setState({
        error: this.props.error,
      });
      return;
    }
    if (this.props.videos) {
      // console.log(this.props.videos);
      if (this.props.videos.items.length > 0) {
        this.setState({
          videos: {
            pageInfo: this.props.videos.pageInfo,
            items: this.props.videos.items,
            nextPageToken: this.props.videos.nextPageToken,
          },
        });
      } else {
        this.setState({
          error: { displayMessage: "No video in this channel" },
        });
      }
    }
  };

  componentWillUnmount = () => {
    this.props.clearError();
  };

  fetchNextPageVideos = async () => {
    const { nextPageToken } = this.props.videos;
    const { channelId } = this.props;
    await this.props.searchVideos({ channelId, order: "date" }, nextPageToken);
    this.setState((state, props) => {
      return {
        videos: {
          items: state.videos.items.concat(props.videos.items),
          nextPageToken: props.videos.nextPageToken,
        },
      };
    });
  };

  render() {
    // console.log(this.state);
    return (
      <React.Fragment>
        {!this.state.error && !this.state.videos && <Loading />}
        {this.state.error && <ErrorMessage error={this.state.error} />}
        {this.state.videos && (
          <div className="mt-3">
            <h3 className="text-primary font-weight-bold mb-2">
              {this.state.videos.items[0].snippet.channelTitle} - Videos
            </h3>
            <VideoGrid videos={this.state.videos.items} />
            {this.state.videos.nextPageToken && (
              <div className="mt-3" style={{ width: "50%", margin: "0 auto" }}>
                <MoreButton onClickMore={this.fetchNextPageVideos} />
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
    videos: state.search.searchResults,
    error: state.error,
  };
};
export default connect(mapStateToProps, { searchVideos, clearError })(
  ChannelVideos
);
