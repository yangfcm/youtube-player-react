import React from "react";
import { connect } from "react-redux";

import Banner from "../layout/Banner";
import Menu from "../layout/Menu";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import ChannelItem from "../modules/ChannelItem";
import { mainMenuItems } from "../../settings";
import { fetchChannel, clearError } from "../../actions/app";

class Channel extends React.Component {
  state = {
    channels: null,
    error: null
  };

  componentDidMount = async () => {
    await this.props.fetchChannel();
    if (this.props.error) {
      this.setState({
        error: this.props.error
      });
      return;
    }
    if (this.props.channelData) {
      this.setState({
        channels: {
          pageInfo: this.props.channelData.pageInfo,
          items: this.props.channelData.items,
          nextPageToken: this.props.channelData.nextPageToken
        }
      });
    }
  };

  componentWillUnmount = () => {
    this.props.clearError();
  };

  renderChannelList = () => {
    return this.state.channels.items.map(item => {
      return <ChannelItem channel={item} key={item.id} />;
    });
  };

  fetchNextPageChannel = async () => {
    const { nextPageToken } = this.props.channelData;
    await this.props.fetchChannel(nextPageToken);
    this.setState((state, props) => {
      return {
        channels: {
          pageInfo: props.channelData.pageInfo,
          items: state.channels.items.concat(props.channelData.items),
          nextPageToken: props.channelData.nextPageToken
        }
      };
    });
  };

  render() {
    const channelListStyle = {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(12rem, 1fr))",
      gap: "1.2rem"
    };

    return (
      <div>
        <Banner />
        <Menu menuItems={mainMenuItems} />
        {!this.state.error && !this.state.channels && <Loading />}{" "}
        {/* Loading */}
        {this.state.error && <ErrorMessage message={this.state.error} />}{" "}
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
                <button
                  className="btn btn-danger"
                  style={{ width: "50%" }}
                  onClick={this.fetchNextPageChannel}
                >
                  More...
                </button>
              )}
            </div>
          </div>
        )}
        {/* Channel list */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    channelData: state.channel,
    errorData: state.error
  };
};

export default connect(mapStateToProps, { fetchChannel, clearError })(Channel);
