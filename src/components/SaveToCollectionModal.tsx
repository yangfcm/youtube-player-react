import { FormEvent, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CollectionItem } from "../features/collection/types";
import { useCreateCollection } from "../features/collection/useCreateCollection";
import { AsyncStatus } from "../settings/types";
import { ErrorMessage } from "./ErrorMessage";
import { SuccessMessage } from "./SuccessMessage";

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
  const { createCollection, status, error, reset } = useCreateCollection();

  useEffect(() => {
    if (status === AsyncStatus.SUCCESS) {
      setName("");
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // Start each time the modal is opened with a clean slate, so a previous
  // success/error doesn't leak into the next item's "Save to Collection" flow.
  useEffect(() => {
    if (open) reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleCreate = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      setNameError("Collection name is required");
      return;
    }
    createCollection(trimmedName, item);
  };

  const loading = status === AsyncStatus.LOADING;

  return (
    <>
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
                  disabled={loading}
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
                  <Button type="submit" variant="contained" disabled={loading}>
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
      </Dialog>
      <ErrorMessage open={open && status === AsyncStatus.FAIL}>
        {error}
      </ErrorMessage>
      <SuccessMessage open={open && status === AsyncStatus.SUCCESS}>
        Collection created
      </SuccessMessage>
    </>
  );
}
