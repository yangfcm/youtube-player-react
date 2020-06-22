import React from "react";
import moment from "moment";

const CommentItem = ({ comment }) => {
  return (
    <React.Fragment>
      <div className="d-flex mb-2" style={{ overflow: "auto" }}>
        <div className="mr-3">
          <img
            src={comment.authorProfileImageUrl}
            alt={comment.authorDisplayName}
            className="rounded-circle"
          />
        </div>
        <div>
          <div className="mb-1">
            <span className="font-weight-bold mr-2">
              {comment.authorDisplayName}
            </span>
            <span className="text-muted">
              {moment(comment.publishedAt).fromNow()}
            </span>
          </div>
          <div dangerouslySetInnerHTML={{ __html: comment.textDisplay }}></div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CommentItem;
