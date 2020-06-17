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
    return this.state.channelIntro && <div>channel banner</div>;
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
