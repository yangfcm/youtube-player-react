import React from "react";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchChannelIntro, clearError } from "../../actions/app";

class ChannelIntro extends React.Component {
  state = {
    channelIntro: null,
    error: null
  };
  componentDidMount = async () => {
    const { channelId } = this.props;
    await this.props.fetchChannelIntro(channelId);
    if (this.props.error) {
      this.setState({
        error: this.props.error
      });
      return;
    }
    if (this.props.channel) {
      if (this.props.channel.items[0]) {
        this.setState({
          channelIntro: this.props.channel.items[0]
        });
      } else {
        this.setState({
          error: "The channel doesn't exist."
        });
      }
    }
  };
  componentWillUnmount = () => {
    this.props.clearError();
  };
  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        {!this.state.error && !this.state.channelIntro && <Loading />}
        {this.state.error && <ErrorMessage message={this.state.error} />}
        {!this.state.error && this.state.channelIntro && (
          <div>Channel intro</div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    channel: state.channel
  };
};
export default connect(mapStateToProps, { fetchChannelIntro, clearError })(
  withRouter(ChannelIntro)
);
