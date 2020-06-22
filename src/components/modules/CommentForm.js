import React from "react";
import { connect } from "react-redux";
import { addComment, updateComment } from "../../actions/app";

class CommentForm extends React.Component {
  state = {};
  handlePublishComment = (e) => {
    e.preventDefault();
    console.log(this.props.video.id, this.props.video.snippet.channelId);
    console.log("publish comment", e.target.elements.comment.value.trim());
  };
  render() {
    return this.props.auth.signedIn ? (
      <div>
        <form onSubmit={this.handlePublishComment}>
          <div className="form-group">
            <label>Publish your comment</label>
            <input className="form-control" name="comment" />
          </div>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-info mr-3">
              Comment
            </button>
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    ) : (
      "You are not signed in"
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    error: state.error,
  };
};
export default connect(mapStateToProps, { addComment, updateComment })(
  CommentForm
);
