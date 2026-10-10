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
  const userId = useSelector(
    (state: RootState) => state.user.profile?.data?.id,
  );

  useEffect(() => {
    if (userId && savedStatus === AsyncStatus.IDLE) {
      dispatch(fetchSavedPlaylists(userId));
    }
  }, [userId, savedStatus, dispatch]);

  return {
    playlists: savedPlaylists,
    status: savedStatus,
    error: savedError,
  };
}
