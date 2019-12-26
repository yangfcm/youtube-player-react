import React from "react";
import { connect } from "react-redux";

import Banner from "../layout/Banner";
import Menu from "../layout/Menu";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import ChannelItem from "../modules/ChannelItem";
import MoreButton from "../modules/MoreButton";
import { mainMenuItems } from "../../settings";
import { fetchChannel, clearError } from "../../actions/app";

class Channel extends React.Component {
  state = {
    channels: null,
    error: null
  };

  componentDidMount = () => {
    this.fetchChannelData();
  };

  componentWillUnmount = () => {
    this.props.clearError();
  };

  fetchChannelData = async (nextPageToken = null) => {
    await this.props.fetchChannel(nextPageToken);
    if (this.props.errorData) {
      // Error handling
      this.setState({
        error: this.props.errorData
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
              nextPageToken: props.channelData.nextPageToken
            }
          };
        });
      } else {
        // Otherwise it is fetching the first page's data
        if (this.props.channelData.items.length === 0) {
          this.setState({
            error: "No channel is found"
          });
          return;
        }
        this.setState({
          channels: {
            pageInfo: this.props.channelData.pageInfo,
            items: this.props.channelData.items,
            nextPageToken: this.props.channelData.nextPageToken
          }
        });
      }
    }
  };

  renderChannelList = () => {
    console.log(this.state.channels.items);
    return this.state.channels.items
      .sort((a, b) => {
        return a.snippet.title < b.snippet.title ? -1 : 1;
      })
      .map(item => {
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
      gap: "0.5rem"
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

const mapStateToProps = state => {
  return {
    channelData: state.channel,
    errorData: state.error
  };
};

export default connect(mapStateToProps, { fetchChannel, clearError })(Channel);
