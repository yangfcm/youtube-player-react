import React from "react";
import { connect } from "react-redux";
import { fetchChannelSubscription } from "../../actions/app";
import { subscribeChannel, unsubscribeChannel } from "../../actions/app";

class SubscriptionButton extends React.Component {
  state = {
    isSubscribed: null,
    isLoading: false,
    buttonText: "",
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
      buttonText: this.props.channel.isSubscribed
        ? "Subscribed"
        : "Unsubscribed",
    });
  };

  handleSubscribe = async () => {
    const accessToken = localStorage.getItem("access_token");
    this.setState({
      isLoading: true,
    });
    try {
      await this.props.subscribeChannel(this.props.channelId, accessToken);
      // console.log(this.props.subscription);
      if (
        this.props.subscription &&
        this.props.subscription.snippet.resourceId.channelId ===
          this.props.channelId
      ) {
        this.setState({
          isSubscribed: true,
          buttonText: "Subscribed",
        });
      }
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  handleUnsubscribe = async () => {
    const accessToken = localStorage.getItem("access_token");
    this.setState({
      isLoading: true,
    });
    try {
      await this.props.unsubscribeChannel(this.props.channelId, accessToken);
      if (!this.props.subscription) {
        this.setState({
          isSubscribed: false,
          buttonText: "Unsubscribed",
        });
      }
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  handleToggleButtonTextOnHover = () => {
    if (this.state.buttonText === "Subscribed") {
      this.setState({
        buttonText: "Unsubscribe",
      });
    }
    if (this.state.buttonText === "Unsubscribed") {
      this.setState({
        buttonText: "Subscribe",
      });
    }
  };

  handleToggleButtonTextOnLeave = () => {
    if (this.state.isSubscribed === true) {
      this.setState({
        buttonText: "Subscribed",
      });
    } else {
      this.setState({
        buttonText: "Unsubscribed",
      });
    }
  };

  render() {
    const { isSubscribed, isLoading, buttonText } = this.state;
    return isSubscribed === null ? (
      " "
    ) : (
      <button
        className={`btn ${
          isSubscribed ? "btn-outline-danger" : "btn-outline-dark"
        }`}
        onMouseOver={this.handleToggleButtonTextOnHover}
        onMouseLeave={this.handleToggleButtonTextOnLeave}
        onClick={isSubscribed ? this.handleUnsubscribe : this.handleSubscribe}
        style={{ width: "120px" }}
        disabled={isLoading}
      >
        {buttonText}
      </button>
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
