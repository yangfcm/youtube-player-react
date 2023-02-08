import { useState, FormEvent, memo } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { usePostComment } from "../features/comment/usePostComment";

function AddCommentComp({ videoId }: { videoId: string }) {
  const [comment, setComment] = useState("");
  const { postVideoComment } = usePostComment(videoId);

  const handleAddComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) return;
    console.log(comment);
    postVideoComment(comment);
  };

  return (
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
      <Button type="submit" startIcon={<SendIcon />} variant="contained">
        Submit
      </Button>
    </Stack>
  );
}

export const AddComment = memo(AddCommentComp);
