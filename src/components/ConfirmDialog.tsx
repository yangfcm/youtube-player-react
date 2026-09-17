import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

type ConfirmDialogPropsType = {
  open: boolean;
  title: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDialogPropsType) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>{title}</DialogTitle>
      <DialogActions sx={{ px: 3, mb: 1 }}>
        <Button onClick={onCancel} color="inherit" disabled={loading}>
          Cancel
        </Button>
        <Button onClick={onConfirm} variant="outlined" disabled={loading}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
