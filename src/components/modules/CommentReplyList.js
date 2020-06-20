import React from "react";

class CommentReplyList extends React.Component {
  state = {
    replies: [],
    showReplies: false,
  };
  render() {
    const { comment } = this.props;
    return (
      <React.Fragment>
        {comment.snippet.totalReplyCount > 0 && (
          <button className="btn btn-link" style={{ padding: "0" }}>
            View{" "}
            {comment.snippet.totalReplyCount === 1
              ? "Reply"
              : `${comment.snippet.totalReplyCount} replies`}
          </button>
        )}
      </React.Fragment>
    );
  }
}

export default CommentReplyList;
