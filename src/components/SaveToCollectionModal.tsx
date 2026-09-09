import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
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
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Save to Collection</DialogTitle>
      <DialogContent>
        <Typography color="text.secondary">
          Save "{item.title}" to a collection — coming soon
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
