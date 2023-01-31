import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { CommentSnippet } from "../features/comment/types";

export function CommentReplies({ comment }: { comment: CommentSnippet }) {
  const { totalReplyCount } = comment.snippet;
  console.log(totalReplyCount);
  if (totalReplyCount === 0) return null;
  return (
    <Box>
      <Button variant="text" sx={{ padding: 0 }}>
        {totalReplyCount} {totalReplyCount > 1 ? "replies" : "reply"}
      </Button>
    </Box>
  );
}
