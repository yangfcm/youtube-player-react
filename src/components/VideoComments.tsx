import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import MessageIcon from "@mui/icons-material/Message";
import { useComments } from "../features/comment/useComments";
import { AsyncStatus } from "../settings/types";
import { LoadingSpinner } from "./LoadingSpinner";
import { CommentItem } from "./CommentItem";
import { MoreButton } from "./MoreButton";
import { NoContent } from "./NoContent";
import { SortComments } from "./SortComments";
import { ErrorMessage } from "./ErrorMessage";
import { AddComment } from "./AddComment";
import { COMMENTS_TURNED_OFF_MESSAGE } from "../settings/constant";

export function VideoComments({ videoId }: { videoId: string }) {
  const {
    comments = [],
    status,
    error,
    fetchMore,
    hasMore,
    order = "relevance",
    setOrder,
  } = useComments(videoId);

  if (error === COMMENTS_TURNED_OFF_MESSAGE) {
    return (
      <Alert severity="error" sx={{ justifyContent: "center" }}>
        {error}
      </Alert>
    );
  }

  return (
    <Accordion>
      <AccordionSummary id="comment-header" expandIcon={<ExpandMoreIcon />}>
        <Typography variant="h5" sx={{ display: "flex", alignItems: "center" }}>
          <MessageIcon />
          &nbsp;&nbsp;Comments
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <SortComments
          disabled={comments.length === 0}
          order={order}
          onChangeOrder={setOrder}
        />
        <AddComment videoId={videoId} />
        {status === AsyncStatus.LOADING && comments.length === 0 && (
          <LoadingSpinner />
        )}
        <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
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
      </AccordionDetails>
    </Accordion>
  );
}
