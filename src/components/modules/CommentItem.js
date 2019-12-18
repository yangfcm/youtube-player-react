import React from "react";
import moment from "moment";

const CommentItem = ({ comment }) => {
  const commentSnippet = comment.snippet.topLevelComment.snippet;
  return (
    <React.Fragment>
      <div className="d-flex mb-2" style={{ overflow: "auto" }}>
        <div className="mr-3">
          <img
            src={commentSnippet.authorProfileImageUrl}
            alt={commentSnippet.authorDisplayName}
            className="rounded-circle"
          />
        </div>
        <div>
          <div className="mb-1">
            <span className="font-weight-bold mr-2">
              {commentSnippet.authorDisplayName}
            </span>
            <span className="text-muted">
              {moment(commentSnippet.publishedAt).fromNow()}
            </span>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: commentSnippet.textDisplay }}
          ></div>
        </div>
      </div>
      <hr />
    </React.Fragment>
  );
};

export default CommentItem;
