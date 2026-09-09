import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { SaveToCollectionModal } from "./SaveToCollectionModal";
import { RequireAuth } from "./RequireAuth";

export function ActionMenu() {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const menuOpen = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => setAnchorEl(null);

  return (
    <RequireAuth>
      <IconButton
        aria-label="Video options"
        size="small"
        onClick={handleOpenMenu}
        sx={{
          "&:hover": {
            bgcolor: (theme) =>
              theme.palette.mode === "dark"
                ? "rgba(255,255,255,0.2)"
                : "rgba(0,0,0,0.2)",
          },
        }}
      >
        <MoreVertIcon fontSize="small" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={menuOpen}
        onClose={handleCloseMenu}
        onClick={handleCloseMenu}
      >
        <MenuItem onClick={() => setModalOpen(true)}>
          <ListItemIcon>
            <BookmarkBorderIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Save to Collection</ListItemText>
        </MenuItem>
      </Menu>
      <SaveToCollectionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </RequireAuth>
  );
}
