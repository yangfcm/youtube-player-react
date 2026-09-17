import { FormEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { CollectionSnippet } from "../features/collection/types";
import { useUpdateCollection } from "../features/collection/useUpdateCollection";
import { RootState } from "../app/store";
import { AsyncStatus } from "../settings/types";
import { LazyImage } from "./LazyImage";
import { ErrorMessage } from "./ErrorMessage";

const MAX_NAME_LENGTH = 40;

type EditCollectionModalPropsType = {
  collection: CollectionSnippet;
  open: boolean;
  onClose: () => void;
};

export function EditCollectionModal({
  collection,
  open,
  onClose,
}: EditCollectionModalPropsType) {
  const [name, setName] = useState(collection.name);
  const [nameError, setNameError] = useState("");

  const collections = useSelector(
    (state: RootState) => state.collection.collections,
  );

  const { updateCollection, status, error } = useUpdateCollection(
    collection.id,
  );

  useEffect(() => {
    if (open) {
      setName(collection.name);
      setNameError("");
    }
  }, [open, collection.name]);

  useEffect(() => {
    if (status === AsyncStatus.SUCCESS) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const trimmedName = name.trim();
  const isUnchanged = trimmedName === collection.name;

  const validate = () => {
    if (!trimmedName) {
      setNameError("Collection name is required");
      return false;
    }
    if (trimmedName.length > MAX_NAME_LENGTH) {
      setNameError(
        `Collection name cannot exceed ${MAX_NAME_LENGTH} characters`,
      );
      return false;
    }
    const isDuplicate = collections.some(
      (existing) =>
        existing.id !== collection.id &&
        existing.name.trim().toLowerCase() === trimmedName.toLowerCase(),
    );
    if (isDuplicate) {
      setNameError("A collection with this name already exists.");
      return false;
    }
    return true;
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    updateCollection({ name: trimmedName });
  };

  const loading = status === AsyncStatus.LOADING;

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
        <DialogTitle>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <span>Edit</span>
            <IconButton aria-label="close" onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            id="edit-collection-form"
            onSubmit={handleSave}
            noValidate
          >
            {collection.thumbnail && (
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <LazyImage
                  src={collection.thumbnail}
                  alt={collection.name}
                  style={{ width: "100%", height: "auto" }}
                  ratio="3:2"
                />
              </Box>
            )}
            <TextField
              label="Name"
              required
              fullWidth
              size="small"
              autoFocus
              disabled={loading}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError("");
              }}
              error={Boolean(nameError)}
              helperText={nameError || " "}
              inputProps={{ maxLength: MAX_NAME_LENGTH }}
            />
          </Box>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <span></span>
            <Button
              type="submit"
              form="edit-collection-form"
              variant="contained"
              disabled={isUnchanged || !trimmedName || loading}
            >
              Save
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
    </>
  );
}
