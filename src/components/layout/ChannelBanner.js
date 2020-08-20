import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchChannelIntro } from "../../actions/channel";
import SubscriptionButton from "../modules/SubscriptionButton";

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
      } else {
        this.props.history.push("/page-not-found");
      }
    }
  };

  render() {
    const { channelIntro } = this.state;
    return (
      channelIntro && (
        <div className="d-flex align-items-center mb-2">
          <div style={{ height: "80px" }} className="d-flex align-items-center">
            {" "}
            <img
              style={{ borderRadius: "50%", maxHeight: "100%" }}
              src={channelIntro.snippet.thumbnails.medium.url}
              alt={channelIntro.snippet.title}
            />
          </div>
          <div className="flex-grow-1 d-flex justify-content-between align-items-center flex-wrap">
            <h3 className="display-6 mx-3 text-primary font-weight-bold ">
              {channelIntro.snippet.title}
            </h3>
            <div className="flex-grow-1 d-flex justify-content-end">
              <SubscriptionButton channelId={this.props.channelId} />
            </div>
          </div>
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => {
  return {
    channel: state.channel.channelIntro,
  };
};
export default connect(mapStateToProps, {
  fetchChannelIntro,
})(withRouter(ChannelBanner));
