import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { SaveToCollectionModal } from "./SaveToCollectionModal";
import { MoreOptionsButton } from "./MoreOptionsButton";
import { RequireAuth } from "./RequireAuth";
import { ErrorMessage } from "./ErrorMessage";
import { SuccessMessage } from "./SuccessMessage";
import { CollectionItem } from "../features/collection/types";
import { useUpdateCollection } from "../features/collection/useUpdateCollection";
import { useUpdateCollectionItem } from "../features/collection/useUpdateCollectionItem";
import { AsyncStatus } from "../settings/types";

type ActionMenuPropsType = {
  item: CollectionItem;
  collectionId?: string;
};

export function ActionMenu({ item, collectionId }: ActionMenuPropsType) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const menuOpen = Boolean(anchorEl);
  const {
    updateCollection,
    status: updateThumbnailStatus,
    error: updateThumbnailError,
    reset: resetUpdateThumbnailStatus,
  } = useUpdateCollection(collectionId ?? "");
  const {
    updateCollectionItem,
    status: removeItemStatus,
    error: removeItemError,
    reset: resetRemoveItemStatus,
  } = useUpdateCollectionItem(collectionId ?? "");

  useEffect(() => {
    if (
      updateThumbnailStatus === AsyncStatus.SUCCESS ||
      updateThumbnailStatus === AsyncStatus.FAIL
    ) {
      resetUpdateThumbnailStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateThumbnailStatus]);

  useEffect(() => {
    if (
      removeItemStatus === AsyncStatus.SUCCESS ||
      removeItemStatus === AsyncStatus.FAIL
    ) {
      resetRemoveItemStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeItemStatus]);

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
        {collectionId && (
          <MenuItem
            disabled={!item.imageUrl}
            onClick={() => updateCollection({ thumbnail: item.imageUrl })}
          >
            <ListItemIcon>
              <ImageOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Set as Collection Thumbnail</ListItemText>
          </MenuItem>
        )}
        {collectionId && (
          <MenuItem onClick={() => updateCollectionItem(item, "remove")}>
            <ListItemIcon>
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Remove from Collection</ListItemText>
          </MenuItem>
        )}
      </Menu>
      <SaveToCollectionModal
        item={item}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <ErrorMessage open={updateThumbnailStatus === AsyncStatus.FAIL}>
        {updateThumbnailError}
      </ErrorMessage>
      <SuccessMessage open={updateThumbnailStatus === AsyncStatus.SUCCESS}>
        Collection thumbnail updated.
      </SuccessMessage>
      <ErrorMessage open={removeItemStatus === AsyncStatus.FAIL}>
        {removeItemError}
      </ErrorMessage>
      <SuccessMessage open={removeItemStatus === AsyncStatus.SUCCESS}>
        Removed from collection.
      </SuccessMessage>
    </RequireAuth>
  );
}
