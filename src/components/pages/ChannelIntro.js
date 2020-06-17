import React from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchChannelIntro, clearError } from "../../actions/app";
import { separateNumber } from "../../utils/helper";

class ChannelIntro extends React.Component {
  state = {
    channelIntro: null,
    error: null,
  };
  componentDidMount = async () => {
    const { channelId } = this.props;
    await this.props.fetchChannelIntro(channelId);
    if (this.props.error) {
      this.setState({
        error: this.props.error,
      });
      return;
    }
    if (this.props.channel) {
      if (this.props.channel.items && this.props.channel.items[0]) {
        this.setState({
          channelIntro: this.props.channel.items[0],
        });
      } else {
        this.setState({
          error: "The channel doesn't exist.",
        });
      }
    }
  };
  componentWillUnmount = () => {
    this.props.clearError();
  };
  render() {
    // console.log(this.state);
    const { channelIntro } = this.state;
    return (
      <React.Fragment>
        {!this.state.error && !this.state.channelIntro && <Loading />}
        {this.state.error && <ErrorMessage message={this.state.error} />}
        {!this.state.error && this.state.channelIntro && (
          <div className="mt-3 row justify-content-center">
            <div className="col-md-10 col-lg-9">
              <div className="d-flex flex-column flex-sm-row">
                <div className="mr-3 my-3 text-center">
                  <img
                    className="rounded-circle"
                    style={{ maxWidth: "120px", height: "auto" }}
                    src={channelIntro.snippet.thumbnails.medium.url}
                    alt={channelIntro.snippet.title}
                  />
                </div>
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-center flex-column">
                    <h3 className="my-3 text-center font-weight-bold text-primary">
                      {channelIntro.snippet.title}
                    </h3>
                    <ul className="list-group">
                      <li className="list-group-item">
                        <FontAwesomeIcon icon="calendar-day" /> Published on{" "}
                        {moment(channelIntro.snippet.publishedAt).format(
                          "D MMM YYYY"
                        )}
                      </li>
                      {channelIntro.snippet.description && (
                        <li className="list-group-item">
                          {" "}
                          <FontAwesomeIcon icon="envelope-open-text" />{" "}
                          Description - {channelIntro.snippet.description}
                        </li>
                      )}
                      <li className="list-group-item">
                        <FontAwesomeIcon icon="user-friends" />{" "}
                        {separateNumber(
                          channelIntro.statistics.subscriberCount
                        )}{" "}
                        Subscribers
                      </li>
                      <li className="list-group-item">
                        <FontAwesomeIcon icon="eye" />{" "}
                        {separateNumber(channelIntro.statistics.viewCount)}{" "}
                        Views
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    channel: state.channel,
    error: state.error,
  };
};
export default connect(mapStateToProps, { fetchChannelIntro, clearError })(
  withRouter(ChannelIntro)
);
