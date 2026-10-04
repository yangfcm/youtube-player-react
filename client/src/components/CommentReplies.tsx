import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { CommentSnippet } from "../features/comment/types";
import { useCommentReplies } from "../features/comment/useCommentReplies";
import { AsyncStatus } from "../settings/types";
import { CommentItem } from "./CommentItem";
import { MoreButton } from "./MoreButton";
import { LoadingSpinner } from "./LoadingSpinner";

export function CommentReplies({ comment }: { comment: CommentSnippet }) {
  const [showReply, setShowReply] = useState(false);
  const { totalReplyCount } = comment.snippet;
  const {
    replies = [],
    status,
    error,
    hasMore,
    fetchMore,
  } = useCommentReplies(comment.id, showReply);

  if (totalReplyCount === 0) return null;

  return (
    <Box>
      <Button
        variant="text"
        sx={{ padding: 0 }}
        onClick={() => setShowReply(!showReply)}
      >
        {totalReplyCount} {totalReplyCount > 1 ? "replies" : "reply"}
      </Button>
      {showReply && (
        <Box>
          {replies.length === 0 && status === AsyncStatus.LOADING && (
            <LoadingSpinner />
          )}
          {status === AsyncStatus.FAIL && (
            <Alert severity="error" sx={{ justifyContent: "center" }}>
              {error}
            </Alert>
          )}
          {replies.map((reply) => (
            <Box sx={{ my: 1 }} key={reply.id}>
              <CommentItem comment={reply} />
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
      )}
    </Box>
  );
}
