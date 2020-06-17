import React from "react";
import { connect } from "react-redux";
import { fetchChannelIntro } from "../../actions/app";

class ChannelBanner extends React.Component {
  state = {
    channelIntro: null,
  };
  componentDidMount = async () => {
    const { channelId } = this.props;
    await this.props.fetchChannelIntro(channelId);
    if (this.props.channel) {
      if (this.props.channel.items && this.props.channel.items[0]) {
        this.setState({
          channelIntro: this.props.channel.items[0],
        });
      }
    }
  };
  render() {
    console.log(this.state.channelIntro);
    return (
      this.state.channelIntro && (
        <div className="d-flex align-items-center mb-2">
          <div style={{ height: "65px" }} className="d-flex align-items-center">
            {" "}
            <img
              style={{ borderRadius: "50%", maxHeight: "100%" }}
              src={this.state.channelIntro.snippet.thumbnails.default.url}
              alt={this.state.channelIntro.snippet.title}
            />
          </div>
          <h3 className="display-6 mx-3">
            {this.state.channelIntro.snippet.title}
          </h3>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    channel: state.channel,
  };
};
export default connect(mapStateToProps, {
  fetchChannelIntro,
})(ChannelBanner);
