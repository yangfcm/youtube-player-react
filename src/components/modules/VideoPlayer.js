import React from "react";
import { connect } from "react-redux";
import moment from "moment";
import { fetchVideo, clearError } from "../../actions/app";
import Loading from "../common/Loading";
import VideoDetail from "./VideoDetail";
import ErrorMessage from "../common/ErrorMessage";

class VideoPlayer extends React.Component {
  state = {
    video: null
  };
  componentDidMount = async () => {
    await this.props.fetchVideo(this.props.videoId);
    this.setState({
      video: this.props.video.items[0]
    });
  };

  componentWillUnmount = () => {
    this.props.clearError();
  };

  render() {
    const videoSrc = `https://www.youtube.com/embed/${this.props.videoId}`;
    const stylePlayerContainer = {
      position: "relative",
      maxWidth: "100%",
      height: "0",
      overflow: "hidden",
      background: "#dcddde",
      paddingBottom: "62%"
    };

    const stylePlayer = {
      width: "100%",
      height: "100%",
      position: "absolute"
    };

    return (
      <div>
        <div style={stylePlayerContainer} className="mb-3">
          <iframe
            src={videoSrc}
            alt="video"
            title="video player"
            style={stylePlayer}
          ></iframe>
        </div>
        {!this.props.error && !this.state.video && <Loading />}

        {this.props.error && <ErrorMessage message={this.props.error} />}

        {this.state.video && <VideoDetail video={this.state.video} />}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    video: state.video,
    error: state.error
  };
};
export default connect(mapStateToProps, { fetchVideo, clearError })(
  VideoPlayer
);
