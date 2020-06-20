import React from "react";
import { connect } from "react-redux";
import { fetchCommentReplies, clearError } from "../../actions/app";
import Loading from "../common/Loading";
import CommentItem from "./CommentItem";
import MoreButton from "./MoreButton";

class CommentReplyList extends React.Component {
  state = {
    replies: null,
    showReplies: false,
    error: null,
    isLoading: false,
  };

  handleToggleShowReplies = async () => {
    // console.log("reply", this.props.comment);
    /** Show/hide replies */
    this.setState((prevState) => {
      return {
        showReplies: !prevState.showReplies,
      };
    });

    /** If there's replies, do nothing */
    if (this.state.replies) return;

    /** If no reply is loaded, load the first page of replies */
    const commentId = this.props.comment.id;
    this.setState({
      isLoading: true,
    });

    await this.props.fetchCommentReplies(commentId);
    if (this.props.error) {
      this.setState({
        error: this.props.error,
        isLoading: false,
      });
      return;
    }
    this.setState({
      replies: this.props.replies,
      isLoading: false,
    });
    // console.log(this.state.replies);
  };

  handleFetchNextPageReplies = async () => {
    // console.log(this.state.replies.nextPageToken);
    const commentId = this.props.comment.id;
    const { nextPageToken } = this.props.replies;
    await this.props.fetchCommentReplies(commentId, nextPageToken);
    if (this.props.error) return;
    this.setState((state, props) => {
      return {
        replies: {
          ...state.replies,
          items: state.replies.items.concat(props.replies.items),
          nextPageToken: props.replies.nextPageToken,
        },
      };
    });
  };

  render() {
    const { comment } = this.props;
    return (
      <React.Fragment>
        {comment.snippet.totalReplyCount > 0 && (
          <button
            className="btn btn-link"
            style={{ padding: "0" }}
            onClick={this.handleToggleShowReplies}
          >
            {this.state.showReplies ? "Hide" : "View"}{" "}
            {comment.snippet.totalReplyCount === 1
              ? "Reply"
              : `${comment.snippet.totalReplyCount} replies`}
          </button>
        )}
        {this.state.showReplies && this.state.isLoading && <Loading />}
        {this.state.showReplies && !this.state.isLoading && this.state.replies && (
          <div>
            {this.state.replies.items.map((item) => {
              return (
                <div className="my-3" key={item.id}>
                  {" "}
                  <CommentItem comment={item.snippet} />
                </div>
              );
            })}
            {this.state.replies.nextPageToken && (
              <div style={{ width: "60%", margin: "0 auto" }}>
                <MoreButton onClickMore={this.handleFetchNextPageReplies} />
              </div>
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    replies: state.comments.replies,
    error: state.error,
  };
};

export default connect(mapStateToProps, {
  fetchCommentReplies,
  clearError,
})(CommentReplyList);
