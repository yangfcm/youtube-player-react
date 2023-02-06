import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import MessageIcon from "@mui/icons-material/Message";
import Stack from "@mui/material/Stack";
import { useComments } from "../features/comment/useComments";
import { AsyncStatus } from "../settings/types";
import { LoadingSpinner } from "./LoadingSpinner";
import { CommentItem } from "./CommentItem";
import { MoreButton } from "./MoreButton";
import { NoContent } from "./NoContent";
import { SortComments } from "./SortComments";

export function VideoComments({ videoId }: { videoId: string }) {
  const {
    comments = [],
    status,
    error,
    fetchMore,
    hasMore,
  } = useComments(videoId);

  return (
    <Box sx={{ my: 2 }}>
      <Stack direction="row" spacing={2}>
        <Typography variant="h5" sx={{ display: "flex", alignItems: "center" }}>
          <MessageIcon />
          &nbsp;Comments
        </Typography>
        <SortComments disabled={comments.length === 0} />
      </Stack>
      {status === AsyncStatus.LOADING && comments.length === 0 && (
        <LoadingSpinner />
      )}
      {status === AsyncStatus.FAIL && (
        <Alert severity="error" sx={{ justifyContent: "center" }}>
          {error}
        </Alert>
      )}
      {status === AsyncStatus.SUCCESS && comments.length === 0 && (
        <NoContent>Nobody has left comment.</NoContent>
      )}
      {comments.map((comment) => (
        <Box sx={{ my: 3 }} key={comment.id}>
          <CommentItem comment={comment} />
        </Box>
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
