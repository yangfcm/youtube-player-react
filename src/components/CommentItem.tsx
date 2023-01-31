import Box from "@mui/material/Box";
import { CommentSnippet } from "../features/comment/types";

export function CommentItem({ comment }: { comment: CommentSnippet }) {
  const topComment = comment.snippet.topLevelComment.snippet;
  return (
    <Box>
      <div dangerouslySetInnerHTML={{ __html: topComment.textDisplay }}></div>
    </Box>
  );
}
