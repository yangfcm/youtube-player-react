import { useState, FormEvent, memo } from "react";
import { useSelector } from "react-redux";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { getVideoById } from "../features/video/selectors";
import { RootState } from "../app/store";

function AddCommentComp({ videoId }: { videoId: string }) {
  const video = useSelector((state: RootState) => getVideoById(state, videoId));
  const channelId = video.snippet.channelId;
  const [comment, setComment] = useState("");

  const handleAddComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!comment.trim()) return;
    console.log(comment);
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
