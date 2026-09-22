import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import { SaveToCollectionModal } from "./SaveToCollectionModal";
import { MoreOptionsButton } from "./MoreOptionsButton";
import { RequireAuth } from "./RequireAuth";
import { ErrorMessage } from "./ErrorMessage";
import { SuccessMessage } from "./SuccessMessage";
import { CollectionItem } from "../features/collection/types";
import { useUpdateCollection } from "../features/collection/useUpdateCollection";
import { useUpdateCollectionItem } from "../features/collection/useUpdateCollectionItem";
import { useArchiveTimelineVideo } from "../features/timeline/useArchiveTimelineVideo";
import { useProfile } from "../features/user/useProfile";
import { AsyncStatus } from "../settings/types";

type ActionMenuPropsType = {
  item: CollectionItem;
  collectionId?: string;
  canArchiveVideo?: boolean;
};

// updateCollection and updateCollectionItem both mutate the same
// collectionsData[collectionId].mutateStatus slot in the store (and
// SaveToCollectionModal's own per-collection rows can touch it too), so
// pendingAction tracks which action *this* menu triggered, and only that
// action's message is shown.
type PendingAction = "thumbnail" | "remove" | "archive" | null;

export function ActionMenu({
  item,
  collectionId,
  canArchiveVideo,
}: ActionMenuPropsType) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<PendingAction>(null);
  const menuOpen = Boolean(anchorEl);
  const {
    updateCollection,
    status: mutateStatus,
    error: mutateError,
    reset: resetMutateStatus,
  } = useUpdateCollection(collectionId ?? "");
  const { updateCollectionItem } = useUpdateCollectionItem(collectionId ?? "");
  const user = useProfile();
  const {
    archiveVideo,
    status: archiveStatus,
    error: archiveError,
    reset: resetArchiveStatus,
  } = useArchiveTimelineVideo(user?.id ?? "");

  useEffect(() => {
    if (
      mutateStatus === AsyncStatus.SUCCESS ||
      mutateStatus === AsyncStatus.FAIL
    ) {
      resetMutateStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mutateStatus]);

  useEffect(() => {
    if (
      archiveStatus === AsyncStatus.SUCCESS ||
      archiveStatus === AsyncStatus.FAIL
    ) {
      resetArchiveStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [archiveStatus]);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => setAnchorEl(null);

  const handleSetThumbnail = () => {
    setPendingAction("thumbnail");
    updateCollection({ thumbnail: item.imageUrl });
  };

  const handleRemoveFromCollection = () => {
    setPendingAction("remove");
    updateCollectionItem(item, "remove");
  };

  const handleArchive = () => {
    if (item.type !== "video") {
      return;
    }
    setPendingAction("archive");
    archiveVideo(item.itemId);
  };

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
          <MenuItem disabled={!item.imageUrl} onClick={handleSetThumbnail}>
            <ListItemIcon>
              <ImageOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Set as Collection Thumbnail</ListItemText>
          </MenuItem>
        )}
        {collectionId && (
          <MenuItem onClick={handleRemoveFromCollection}>
            <ListItemIcon>
              <DeleteOutlineOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Remove from Collection</ListItemText>
          </MenuItem>
        )}
        {canArchiveVideo && item.type === "video" && (
          <MenuItem onClick={handleArchive}>
            <ListItemIcon>
              <ArchiveOutlinedIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Archive</ListItemText>
          </MenuItem>
        )}
      </Menu>
      <SaveToCollectionModal
        item={item}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <ErrorMessage
        open={
          mutateStatus === AsyncStatus.FAIL && pendingAction === "thumbnail"
        }
      >
        {mutateError}
      </ErrorMessage>
      <SuccessMessage
        open={
          mutateStatus === AsyncStatus.SUCCESS && pendingAction === "thumbnail"
        }
      >
        Collection thumbnail updated.
      </SuccessMessage>
      {/* No success message here: on removal the item (and this menu) is
          unmounted in the same render as mutateStatus flipping to SUCCESS,
          so a success toast would never get a chance to show. */}
      <ErrorMessage
        open={mutateStatus === AsyncStatus.FAIL && pendingAction === "remove"}
      >
        {mutateError}
      </ErrorMessage>
      {/* No success message here either: archiving flips isActive to false,
          which drops the video from the timeline (and unmounts this menu)
          in the same render as archiveStatus flipping to SUCCESS. */}
      <ErrorMessage
        open={archiveStatus === AsyncStatus.FAIL && pendingAction === "archive"}
      >
        {archiveError}
      </ErrorMessage>
    </RequireAuth>
  );
}
