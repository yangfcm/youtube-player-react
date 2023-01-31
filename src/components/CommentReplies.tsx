import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { CommentSnippet } from "../features/comment/types";
import { useCommentReplies } from "../features/comment/useCommentReplies";

export function CommentReplies({ comment }: { comment: CommentSnippet }) {
  const { totalReplyCount } = comment.snippet;
  const {
    replies = [],
    status,
    error,
    hasMore,
    fetchCommentReplies,
    fetchMore,
  } = useCommentReplies(comment.id);

  if (totalReplyCount === 0) return null;
  return (
    <Box>
      <Button variant="text" sx={{ padding: 0 }} onClick={fetchCommentReplies}>
        {totalReplyCount} {totalReplyCount > 1 ? "replies" : "reply"}
      </Button>
      {replies.map((reply) => reply.snippet.textDisplay)}
    </Box>
  );
}
