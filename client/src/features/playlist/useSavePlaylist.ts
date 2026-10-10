import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { AsyncStatus } from "../../settings/types";
import { SavedPlaylist } from "./types";
import {
  savePlaylist,
  removePlaylist,
  resetPlaylistWriteStatus,
} from "./playlistSlice";

export function useSavePlaylist(playlistId: string) {
  const dispatch = useAppDispatch();
  // Only this playlist's own write error - the shared list error is reported by the page.
  const error = useSelector(
    (state: RootState) => state.playlist.errors[playlistId] || "",
  );
  const status = useSelector(
    (state: RootState) =>
      state.playlist.writeStatus[playlistId] ?? AsyncStatus.IDLE,
  );
  const saved = useSelector((state: RootState) =>
    !!state.user.profile.data?.playlists?.includes(playlistId),
  );
  const writing = useSelector(
    (state: RootState) => !!state.playlist.pending[playlistId],
  );
  const userId = useSelector(
    (state: RootState) => state.user.profile?.data?.id,
  );

  const save = useCallback(
    (playlist: SavedPlaylist) => {
      if (!userId) return;
      dispatch(savePlaylist({ userId, playlist }));
    },
    [userId, dispatch],
  );

  const remove = useCallback(() => {
    if (!userId) return;
    dispatch(removePlaylist({ userId, playlistId }));
  }, [userId, playlistId, dispatch]);

  const reset = useCallback(() => {
    dispatch(resetPlaylistWriteStatus(playlistId));
  }, [playlistId, dispatch]);

  return {
    saved,
    loading: writing,
    status,
    error,
    save,
    remove,
    reset,
  };
}
