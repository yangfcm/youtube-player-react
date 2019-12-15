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
  componentDidMount = async () => {
    if (!this.props.channelData) {
      await this.props.fetchChannel();
    }
  };

  componentWillUnmount = () => {
    this.props.clearError();
  };

  renderChannelList = () => {
    return this.props.channelData.items.map(item => {
      return <ChannelItem channel={item} key={item.id} />;
    });
  };

  fetchNextPageChannel = async () => {
    const { nextPageToken } = this.props.channelData;
    await this.props.fetchChannel(nextPageToken);
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
        {!this.props.errorData && !this.props.channelData && <Loading />}{" "}
        {/* Loading */}
        {this.props.errorData && (
          <ErrorMessage message={this.props.errorData} />
        )}{" "}
        {/* Error message */}
        {this.props.channelData && (
          <div className="mt-3">
            <div style={channelListStyle} className="mb-3">
              {this.renderChannelList()}
            </div>
            <div className="text-center">
              {this.props.channelData.nextPageToken && (
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
