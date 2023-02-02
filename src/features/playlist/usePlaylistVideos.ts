import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchPlaylistVideos } from "./playlistSlice";

export function usePlaylistVideos(playlistId: string) {
  const dispatch = useAppDispatch();
  const playlistVideos = useSelector(
    (state: RootState) => state.playlist.playlists[playlistId]?.items || []
  );
  const asyncStatus = useSelector((state: RootState) => state.playlist.status);
  const error = useSelector((state: RootState) => state.playlist.error);
  const nextPageToken = useSelector(
    (state: RootState) => state.playlist.playlists[playlistId]?.nextPageToken
  );

  const fetchMore = useCallback(() => {
    if (nextPageToken) {
      dispatch(
        fetchPlaylistVideos({
          playlistId,
          pageToken: nextPageToken,
        })
      );
    }
  }, [dispatch, nextPageToken, playlistId]);

  useEffect(() => {
    if (playlistId && playlistVideos.length === 0) {
      dispatch(fetchPlaylistVideos({ playlistId }));
    }
  }, [playlistId, dispatch, playlistVideos.length]);

  return {
    playlistVideos,
    status: asyncStatus,
    error,
    hasMore: !!nextPageToken,
    fetchMore,
  };
}
