import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import MessageIcon from "@mui/icons-material/Message";
import { useComments } from "../features/comment/useComments";
import { AsyncStatus } from "../settings/types";
import { LoadingSpinner } from "./LoadingSpinner";
import { CommentItem } from "./CommentItem";
import { MoreButton } from "./MoreButton";

export function VideoComments({ videoId }: { videoId: string }) {
  const { comments, status, error, fetchMore, hasMore } = useComments(videoId);

  if (!comments?.length && status === AsyncStatus.LOADING) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h5" sx={{ display: "flex", alignItems: "center" }}>
        <MessageIcon />
        &nbsp;Comments
      </Typography>
      {status === AsyncStatus.FAIL && (
        <Alert severity="error" sx={{ justifyContent: "center" }}>
          {error}
        </Alert>
      )}
      {comments &&
        comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      {hasMore && (
        <MoreButton
          loading={status === AsyncStatus.LOADING}
          onClick={fetchMore}
        >
          More
        </MoreButton>
      )}
    </Box>
  );
}
