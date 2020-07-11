import React from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loading from "../common/Loading";
import ErrorMessage from "../common/ErrorMessage";
import CommentItem from "./CommentItem";
import MoreButton from "./MoreButton";
import CommentReplyList from "../modules/CommentReplyList";
import CommentForm from "../modules/CommentForm";
import { fetchComments } from "../../actions/comment";
import { clearError } from "../../actions/error";

class CommentsList extends React.Component {
  state = {
    comments: null,
    error: "",
  };

  fetchComments = async () => {
    const accessToken = localStorage.getItem("access_token");
    await this.props.fetchComments(this.props.videoId, null, accessToken);
    if (this.props.error) {
      this.setState({
        error: this.props.error,
      });
      return;
    }
    if (this.props.isDisabled) {
      this.setState({
        comments: {
          items: [],
          disabled: true,
        },
        error: "",
      });
    } else {
      this.setState({
        comments: {
          pageInfo: this.props.comments.pageInfo,
          items: this.props.comments.items,
          nextPageToken: this.props.comments.nextPageToken,
          disabled: false,
        },
        error: "",
      });
    }
  };

  componentDidMount = async () => {
    await this.fetchComments();
  };

  componentDidUpdate = async (prevProps) => {
    if (prevProps.videoId !== this.props.videoId) {
      // If video changes, fetch the comments of new video
      this.fetchComments();
      // console.log(prevProps.comments.myComments);
      // console.log(this.props.comments.myComments);
    }
  };

  componentWillUnmount = () => {
    this.props.clearError();
  };

  fetchNextPageComments = async () => {
    const { nextPageToken } = this.state.comments;
    if (!nextPageToken) {
      return;
    }
    const accessToken = localStorage.getItem("access_token");
    await this.props.fetchComments(
      this.props.videoId,
      nextPageToken,
      accessToken
    );
    if (this.props.error) {
      this.setState({
        error: this.props.error,
      });
      return;
    }
    this.setState((state, props) => {
      return {
        comments: {
          pageInfo: props.comments.pageInfo,
          items: state.comments.items.concat(props.comments.items),
          nextPageToken: props.comments.nextPageToken,
        },
        error: "",
      };
    });
  };

  render() {
    return (
      <React.Fragment>
        {!this.state.error && !this.state.comments && <Loading />}
        {this.state.error && <ErrorMessage error={this.state.error} />}
        {!this.state.error && this.state.comments && (
          <div className="mb-3">
            <h5 className="mb-3">
              <FontAwesomeIcon icon="comments" /> Comments
            </h5>
            {this.state.comments.disabled && (
              <div className="text-muted text-center">Comment is disabled</div>
            )}
            {!this.state.comments.disabled &&
              this.state.comments.items.length === 0 && (
                <div className="text-muted text-center"> No comment</div>
              )}
            {!this.state.comments.disabled && (
              <CommentForm video={this.props.video} />
            )}
            {this.props.myComments &&
              this.props.myComments.map((item) => {
                return (
                  <React.Fragment key={item.id}>
                    <CommentItem
                      comment={item.snippet.topLevelComment.snippet}
                    />
                    <div className="pl-4">
                      <CommentReplyList comment={item} />
                    </div>
                    <div className="my-2">
                      <hr />
                    </div>
                  </React.Fragment>
                );
              })}
            {this.state.comments.items.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  <CommentItem comment={item.snippet.topLevelComment.snippet} />
                  <div className="pl-4">
                    <CommentReplyList comment={item} />
                  </div>
                  <div className="my-2">
                    <hr />
                  </div>
                </React.Fragment>
              );
            })}
            {this.state.comments && this.state.comments.nextPageToken && (
              <MoreButton onClickMore={this.fetchNextPageComments}>
                More Comments
              </MoreButton>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comment.comments,
    myComments: state.comment.myComments,
    isDisabled: state.comment.isDisabled,
    error: state.error,
  };
};
export default connect(mapStateToProps, { fetchComments, clearError })(
  CommentsList
);
