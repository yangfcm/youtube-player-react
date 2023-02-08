import { useState, FormEvent, memo } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { usePostComment } from "../features/comment/usePostComment";
import { ErrorMessage } from "./ErrorMessage";
import { AsyncStatus } from "../settings/types";

function AddCommentComp({ videoId }: { videoId: string }) {
  const [comment, setComment] = useState("");
  const { postVideoComment, status, error } = usePostComment(videoId);

  const handleAddComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) return;
    console.log(comment);
    postVideoComment(comment);
  };

  return (
    <>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1}
        alignItems="flex-end"
        component="form"
        onSubmit={handleAddComment}
      >
        <TextField
          fullWidth
          multiline
          variant="standard"
          label="Leave your comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button
          type="submit"
          startIcon={<SendIcon />}
          variant="contained"
          disabled={status === AsyncStatus.LOADING}
        >
          Submit
        </Button>
      </Stack>
    </>
  );
}

export const AddComment = memo(AddCommentComp);
