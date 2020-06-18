import React from "react";
import { connect } from "react-redux";
import { fetchChannelSubscription } from "../../actions/app";
class SubscriptionButton extends React.Component {
  state = {
    isSubscribed: null,
  };

  componentDidMount = async () => {
    console.log(this.props.auth);
    if (!this.props.auth.signedIn) return;
    this.fetchSubscriptionStatus();
  };

  componentDidUpdate = (prevProps) => {
    if (!prevProps.auth.signedIn && this.props.auth.signedIn) {
      this.fetchSubscriptionStatus();
    }
    if (prevProps.auth.signedIn && !this.props.auth.signedIn) {
      this.setState({
        isSubscribed: null,
      });
    }
  };

  fetchSubscriptionStatus = async () => {
    const accessToken = localStorage.getItem("access_token");
    await this.props.fetchChannelSubscription(
      this.props.channelId,
      accessToken
    );
    this.setState({
      isSubscribed: this.props.channel.isSubscribed,
    });
  };

  render() {
    const { isSubscribed } = this.state;
    return isSubscribed === true ? (
      <button className="btn btn-danger">Subscribed</button>
    ) : isSubscribed === false ? (
      <button className="btn btn-dark">Unsubscribed</button>
    ) : (
      ""
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    channel: state.channel,
  };
};
export default connect(mapStateToProps, {
  fetchChannelSubscription,
})(SubscriptionButton);
