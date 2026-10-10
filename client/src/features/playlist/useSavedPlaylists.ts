import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchSavedPlaylists } from "./playlistSlice";
import { AsyncStatus } from "../../settings/types";

export function useSavedPlaylists() {
  const dispatch = useAppDispatch();
  const { savedPlaylists, savedStatus, savedError } = useSelector(
    (state: RootState) => state.playlist,
  );
  const playlistIds = useSelector(
    (state: RootState) => state.user.profile?.data?.playlists,
  );
  const hasSavedPlaylistIds = !!playlistIds && playlistIds.length > 0;

  useEffect(() => {
    if (hasSavedPlaylistIds && savedStatus === AsyncStatus.IDLE) {
      dispatch(fetchSavedPlaylists(playlistIds as string[]));
    }
  }, [hasSavedPlaylistIds, playlistIds, savedStatus, dispatch]);

  return {
    playlists: savedPlaylists,
    status: hasSavedPlaylistIds ? savedStatus : AsyncStatus.SUCCESS,
    error: savedError,
  };
}
