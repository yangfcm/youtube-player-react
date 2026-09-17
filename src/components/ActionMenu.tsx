import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { SaveToCollectionModal } from "./SaveToCollectionModal";
import { MoreOptionsButton } from "./MoreOptionsButton";
import { RequireAuth } from "./RequireAuth";
import { CollectionItem } from "../features/collection/types";

type ActionMenuPropsType = {
  item: CollectionItem;
};

export function ActionMenu({ item }: ActionMenuPropsType) {
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
      <MoreOptionsButton ariaLabel="Video options" onClick={handleOpenMenu} />
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
        <MenuItem onClick={() => {}}>
          <ListItemIcon>
            <ImageOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Set as Collection Thumbnail</ListItemText>
        </MenuItem>
      </Menu>
      <SaveToCollectionModal
        item={item}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </RequireAuth>
  );
}
