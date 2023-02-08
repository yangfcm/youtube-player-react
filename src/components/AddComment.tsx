import { useState, FormEvent } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export function AddComment() {
  const [comment, setComment] = useState("");

  const handleAddComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
