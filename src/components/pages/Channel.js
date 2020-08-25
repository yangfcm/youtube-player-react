import React from "react";
import { connect } from "react-redux";

import Banner from "../layout/Banner";
import Menu from "../layout/Menu";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import ChannelItem from "../modules/ChannelItem";
import MoreButton from "../modules/MoreButton";
import NoSignedIn from "../common/NoSignIn";
import { mainMenuItems } from "../../settings";
import { fetchChannel } from "../../actions/channel";
import { clearError } from "../../actions/error";

export class Channel extends React.Component {
  state = {
    channels: null,
    error: null,
  };

  componentDidMount = () => {
    // console.log("did mount", this.props.auth);
    if (this.props.auth.signedIn) {
      this.fetchChannelData();
    }
  };

  componentDidUpdate = (prevProps, prevState) => {
    /** Switch to sign in */
    if (this.props.auth.signedIn && !prevProps.auth.signedIn) {
      this.props.clearError();
      this.fetchChannelData();
    }

    /** Sign out */
    if (!this.props.auth.signedIn && prevProps.auth.signedIn) {
      this.setState({
        channels: null,
        error: null,
      });
    }
  };

  componentWillUnmount = () => {
    this.props.clearError();
  };

  fetchChannelData = async (nextPageToken = null) => {
    const accessToken = localStorage.getItem("access_token");
    // console.log(accessToken);
    await this.props.fetchChannel(nextPageToken, accessToken);
    if (this.props.error) {
      // Error handling
      this.setState({
        error: this.props.error,
      });
      return;
    }
    if (this.props.channelData) {
      // Fetch data from API successfully
      if (nextPageToken) {
        // If nextPageToken exists, indicating it is fetching next page's data
        this.setState((state, props) => {
          return {
            channels: {
              pageInfo: props.channelData.pageInfo,
              items: state.channels.items.concat(props.channelData.items),
              nextPageToken: props.channelData.nextPageToken,
            },
          };
        });
      } else {
        // Otherwise it is fetching the first page's data
        if (this.props.channelData.items.length === 0) {
          this.setState({
            error: { displayMessage: "You haven't subscribed any channel" },
          });
          return;
        }
        this.setState({
          channels: {
            pageInfo: this.props.channelData.pageInfo,
            items: this.props.channelData.items,
            nextPageToken: this.props.channelData.nextPageToken,
          },
        });
      }
    }
  };

  renderChannelList = () => {
    // console.log(this.state.channels.items);
    return this.state.channels.items
      .sort((a, b) => {
        return a.snippet.title < b.snippet.title ? -1 : 1;
      })
      .map((item) => {
        return <ChannelItem channel={item} key={item.id} />;
      });
  };

  fetchNextPageChannel = async () => {
    const { nextPageToken } = this.state.channels;
    this.fetchChannelData(nextPageToken);
  };

  render() {
    const channelListStyle = {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(10rem, 1fr))",
      gap: "0.5rem",
    };

    const { signedIn } = this.props.auth;

    return (
      <div>
        <Banner />
        <Menu menuItems={mainMenuItems} />
        {signedIn === null && ""}
        {signedIn === false && <NoSignedIn />}
        {signedIn && !this.state.error && !this.state.channels && (
          <Loading />
        )}{" "}
        {/* Loading */}
        {signedIn && this.state.error && (
          <ErrorMessage error={this.state.error} />
        )}{" "}
        {/* Error message */}
        {this.state.channels && (
          <div className="mt-3">
            <h3 className="mb-2 text-primary font-weight-bold">
              My Subscriptions
            </h3>
            <div style={channelListStyle} className="mb-3">
              {this.renderChannelList()}
            </div>
            <div className="text-center">
              {this.state.channels.nextPageToken && (
                <div
                  className="mt-3"
                  style={{ width: "50%", margin: "0 auto" }}
                >
                  <MoreButton onClickMore={this.fetchNextPageChannel} />
                </div>
              )}
            </div>
          </div>
        )}
        {/* Channel list */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    channelData: state.channel.channels,
    error: state.error,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { fetchChannel, clearError })(Channel);
