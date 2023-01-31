import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { CommentSnippet } from "../features/comment/types";
import { fromNow } from "../app/utils";

export function CommentItem({ comment }: { comment: CommentSnippet }) {
  const topComment = comment.snippet.topLevelComment.snippet;
  return (
    <Box sx={{ display: "flex", my: 2 }}>
      <Avatar
        src={topComment.authorProfileImageUrl}
        alt={topComment.authorDisplayName}
      />
      <Box sx={{ ml: 2 }}>
        <Box sx={{ display: "flex" }}>
          <Typography variant="subtitle2">
            {topComment.authorDisplayName}
          </Typography>
          &nbsp;&nbsp;
          <Typography variant="body2">
            {fromNow(topComment.publishedAt)}
          </Typography>
        </Box>
        <div dangerouslySetInnerHTML={{ __html: topComment.textDisplay }}></div>
      </Box>
    </Box>
  );
}
