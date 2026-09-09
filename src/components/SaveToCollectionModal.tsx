import { FormEvent, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CollectionItem } from "../features/collection/types";

type SaveToCollectionModalPropsType = {
  item: CollectionItem;
  open: boolean;
  onClose: () => void;
};

export function SaveToCollectionModal({
  item,
  open,
  onClose,
}: SaveToCollectionModalPropsType) {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setNameError("Collection name is required");
      return;
    }
    // TODO: create the collection and add `item` to it.
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Save to My Collection</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box sx={{ flex: 1, py: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 2 }}>
              New Collection
            </Typography>
            <Box component="form" onSubmit={handleCreate} noValidate>
              <TextField
                label="Name"
                required
                fullWidth
                size="small"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) setNameError("");
                }}
                error={Boolean(nameError)}
                helperText={nameError || " "}
                sx={{ mb: 4 }}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button type="submit" variant="contained">
                  Create
                </Button>
              </Box>
            </Box>
          </Box>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ display: { xs: "none", sm: "block" }, mx: 2 }}
          />
          <Divider sx={{ display: { xs: "block", sm: "none" }, my: 2 }} />
          <Box sx={{ flex: 1, py: 1 }}>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Add to an existing collection
            </Typography>
            <Typography color="text.secondary">
              Your collections will appear here soon.
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions> */}
    </Dialog>
  );
}
