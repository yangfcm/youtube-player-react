import React from "react";
import { connect } from "react-redux";
import { fetchChannelSubscription } from "../../actions/app";
import { subscribeChannel, unsubscribeChannel } from "../../actions/app";

class SubscriptionButton extends React.Component {
  state = {
    isSubscribed: null,
  };

  componentDidMount = async () => {
    // console.log(this.props.auth);
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

  handleSubscribe = async () => {
    const accessToken = localStorage.getItem("access_token");
    await this.props.subscribeChannel(this.props.channelId, accessToken);
    console.log(this.props.subscription);
    if (
      this.props.subscription &&
      this.props.subscription.snippet.resourceId.channelId ===
        this.props.channelId
    ) {
      this.setState({
        isSubscribed: true,
      });
    }
  };
  handleUnsubscribe = () => {};

  handleToggleButtonText = (e) => {
    const buttonText = e.target.innerText;
    let newButtonText = buttonText;
    switch (buttonText) {
      case "Subscribed":
        newButtonText = "Unsubscribe";
        break;
      case "Unsubscribed":
        newButtonText = "Subscribe";
        break;
      case "Subscribe":
        newButtonText = "Unsubscribed";
        break;
      case "Unsubscribe":
        newButtonText = "Subscribed";
        break;
      default:
        newButtonText = buttonText;
    }
    e.target.innerText = newButtonText;
    // console.log(e.target);
  };

  render() {
    const { isSubscribed } = this.state;
    return isSubscribed === true ? (
      <button
        className="btn btn-outline-danger"
        onClick={this.handleUnsubscribe}
        onMouseOver={this.handleToggleButtonText}
        onMouseLeave={this.handleToggleButtonText}
        style={{ width: "120px" }}
      >
        Subscribed
      </button>
    ) : isSubscribed === false ? (
      <button
        className="btn btn-outline-dark"
        onClick={this.handleSubscribe}
        onMouseOver={this.handleToggleButtonText}
        onMouseLeave={this.handleToggleButtonText}
        style={{ width: "120px" }}
      >
        Unsubscribed
      </button>
    ) : (
      ""
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    channel: state.channel,
    subscription: state.subscription,
  };
};
export default connect(mapStateToProps, {
  fetchChannelSubscription,
  subscribeChannel,
  unsubscribeChannel,
})(SubscriptionButton);
