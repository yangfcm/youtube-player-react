import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { CommentSnippet, ReplySnippet } from "../features/comment/types";
import { fromNow } from "../app/utils";
import { CommentReplies } from "./CommentReplies";

export function CommentItem({
  comment,
}: {
  comment: CommentSnippet | ReplySnippet;
}) {
  const isTopComment = (comment as CommentSnippet).snippet.topLevelComment;
  const totalReplyCount = isTopComment
    ? (comment as CommentSnippet).snippet.totalReplyCount
    : 0;
  const commentItem = isTopComment
    ? (comment as CommentSnippet).snippet.topLevelComment.snippet
    : (comment as ReplySnippet).snippet;
  // const topComment = comment.snippet.topLevelComment.snippet;
  return (
    <Box sx={{ display: "flex" }}>
      <Avatar
        src={commentItem.authorProfileImageUrl}
        alt={commentItem.authorDisplayName}
      />
      <Box sx={{ ml: 2 }}>
        <Box sx={{ display: "flex" }}>
          <Typography variant="subtitle2">
            {commentItem.authorDisplayName}
          </Typography>
          &nbsp;&nbsp;
          <Typography variant="body2">
            {fromNow(commentItem.publishedAt)}
          </Typography>
        </Box>
        <div
          dangerouslySetInnerHTML={{ __html: commentItem.textDisplay }}
        ></div>
        {isTopComment && totalReplyCount > 0 && (
          <CommentReplies comment={comment as CommentSnippet} />
        )}
      </Box>
    </Box>
  );
}
