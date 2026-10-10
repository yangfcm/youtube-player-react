import { useEffect, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import HideSourceIcon from "@mui/icons-material/HideSource";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import PlaylistRemoveIcon from "@mui/icons-material/PlaylistRemove";
import { SaveToCollectionModal } from "./SaveToCollectionModal";
import { MoreOptionsButton } from "./MoreOptionsButton";
import { RequireAuth } from "./RequireAuth";
import { ErrorMessage } from "./ErrorMessage";
import { SuccessMessage } from "./SuccessMessage";
import { CollectionItem } from "../features/collection/types";
import { useUpdateCollection } from "../features/collection/useUpdateCollection";
import { useUpdateCollectionItem } from "../features/collection/useUpdateCollectionItem";
import { useToggleHideTimelineVideo } from "../features/timeline/useToggleHideTimelineVideo";
import { useSavePlaylist } from "../features/playlist/useSavePlaylist";
import { useProfile } from "../features/user/useProfile";
import { AsyncStatus } from "../settings/types";

type ActionMenuPropsType = {
  item: CollectionItem;
  collectionId?: string;
  canHideVideo?: boolean;
};

// updateCollection and updateCollectionItem both mutate the same
// collectionsData[collectionId].mutateStatus slot in the store (and
// SaveToCollectionModal's own per-collection rows can touch it too), so
// pendingAction tracks which action *this* menu triggered, and only that
// action's message is shown.
type PendingAction =
  | "thumbnail"
  | "remove"
  | "hide"
  | "savePlaylist"
  | "removePlaylist"
  | null;

export function ActionMenu({
  item,
  collectionId,
  canHideVideo,
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
    hideVideo,
    status: hideStatus,
    error: hideError,
    reset: resetHideStatus,
  } = useToggleHideTimelineVideo(user?.id ?? "");
  const {
    saved: playlistSaved,
    loading: playlistWriting,
    status: playlistStatus,
    error: playlistError,
    save: savePlaylistItem,
    remove: removePlaylistItem,
    reset: resetPlaylistStatus,
  } = useSavePlaylist(item.type === "playlist" ? item.itemId : "");

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
    if (hideStatus === AsyncStatus.SUCCESS || hideStatus === AsyncStatus.FAIL) {
      resetHideStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hideStatus]);

  useEffect(() => {
    if (
      playlistStatus === AsyncStatus.SUCCESS ||
      playlistStatus === AsyncStatus.FAIL
    ) {
      resetPlaylistStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playlistStatus]);

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

  const handleHide = () => {
    if (item.type !== "video") {
      return;
    }
    setPendingAction("hide");
    hideVideo(item.itemId);
  };

  const handleSavePlaylist = () => {
    if (item.type !== "playlist") {
      return;
    }
    setPendingAction("savePlaylist");
    savePlaylistItem({
      id: item.itemId,
      title: item.title,
      thumbnail: item.imageUrl ?? "",
      channelId: item.channelId ?? "",
      channelTitle: item.channelTitle ?? "",
      itemCount: item.itemCount,
    });
  };

  const handleRemovePlaylist = () => {
    setPendingAction("removePlaylist");
    removePlaylistItem();
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
        {canHideVideo && item.type === "video" && (
          <MenuItem onClick={handleHide}>
            <ListItemIcon>
              <HideSourceIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Hide</ListItemText>
          </MenuItem>
        )}
        {item.type === "playlist" && !playlistSaved && (
          <MenuItem disabled={playlistWriting} onClick={handleSavePlaylist}>
            <ListItemIcon>
              <PlaylistAddIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Save to My Playlist</ListItemText>
          </MenuItem>
        )}
        {item.type === "playlist" && playlistSaved && (
          <MenuItem disabled={playlistWriting} onClick={handleRemovePlaylist}>
            <ListItemIcon>
              <PlaylistRemoveIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Remove from My Playlist</ListItemText>
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
      <ErrorMessage
        open={hideStatus === AsyncStatus.FAIL && pendingAction === "hide"}
      >
        {hideError}
      </ErrorMessage>
      <ErrorMessage
        open={
          playlistStatus === AsyncStatus.FAIL &&
          pendingAction === "savePlaylist"
        }
      >
        {playlistError}
      </ErrorMessage>
      <SuccessMessage
        open={
          playlistStatus === AsyncStatus.SUCCESS &&
          pendingAction === "savePlaylist"
        }
      >
        Saved to My Playlist.
      </SuccessMessage>
      <ErrorMessage
        open={
          playlistStatus === AsyncStatus.FAIL &&
          pendingAction === "removePlaylist"
        }
      >
        {playlistError}
      </ErrorMessage>
      <SuccessMessage
        open={
          playlistStatus === AsyncStatus.SUCCESS &&
          pendingAction === "removePlaylist"
        }
      >
        Removed from My Playlist.
      </SuccessMessage>
    </RequireAuth>
  );
}
