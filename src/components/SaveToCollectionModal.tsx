import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import placeholder from "../images/placeholder-item.jpg";
import { CollectionItem } from "../features/collection/types";
import { useCreateCollection } from "../features/collection/useCreateCollection";
import { fetchUserCollections } from "../features/collection/collectionSlice";
import { useAppDispatch } from "../app/hooks";
import { RootState } from "../app/store";
import { AsyncStatus } from "../settings/types";
import { ErrorMessage } from "./ErrorMessage";
import { SuccessMessage } from "./SuccessMessage";
import { LoadingSpinner } from "./LoadingSpinner";

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

  const dispatch = useAppDispatch();
  const userId = useSelector(
    (state: RootState) => state.user.profile?.data?.id,
  );
  const {
    collections,
    status: fetchStatus,
    error: fetchError,
  } = useSelector((state: RootState) => state.collection);

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

  // Each ActionMenu mounts its own always-present modal instance, so a
  // mount-time fetch (like useCollections) would fire once per item card on
  // the page. Fetching on the open transition instead means exactly one
  // fetch per actual open, and also refreshes the list to pick up anything
  // just created via the left panel.
  useEffect(() => {
    if (open && userId) dispatch(fetchUserCollections(userId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, userId]);

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
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
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
                Add to existing collection
              </Typography>
              {fetchStatus === AsyncStatus.LOADING &&
                collections.length === 0 && <LoadingSpinner />}
              {fetchStatus === AsyncStatus.SUCCESS &&
                collections.length === 0 && (
                  <Typography color="text.secondary">
                    You don't have any collection yet.
                  </Typography>
                )}
              {fetchStatus === AsyncStatus.FAIL && (
                <Typography color="error">{fetchError}</Typography>
              )}
              {collections.length > 0 && (
                <Box sx={{ maxHeight: 240, overflowY: "auto" }}>
                  <List disablePadding>
                    {collections.map((collection) => (
                      <ListItem
                        key={collection.id}
                        disablePadding
                        sx={{ py: 0.5 }}
                      >
                        <ListItemAvatar>
                          <Avatar
                            variant="rounded"
                            src={collection.thumbnail || placeholder}
                            alt={collection.name}
                          />
                        </ListItemAvatar>
                        <ListItemText primary={collection.name} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <ErrorMessage open={open && status === AsyncStatus.FAIL}>
        {error}
      </ErrorMessage>
      <SuccessMessage open={status === AsyncStatus.SUCCESS}>
        Collection created
      </SuccessMessage>
    </>
  );
}
