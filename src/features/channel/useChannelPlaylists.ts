import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchChannelPlaylists } from "./channelSlice";

export function useChannelPlaylists(channelId: string) {
  const dispatch = useAppDispatch();
  const asyncStatus = useSelector(
    (state: RootState) => state.channel.playlists.status
  );
  const error = useSelector(
    (state: RootState) => state.channel.playlists.error
  );

  const channelPlaylists = useSelector(
    (state: RootState) => state.channel.playlists.data[channelId]?.items || []
  );
  const nextPageToken = useSelector(
    (state: RootState) => state.channel.playlists.data[channelId]?.nextPageToken
  );

  const fetchMore = useCallback(() => {
    if (nextPageToken) {
      dispatch(
        fetchChannelPlaylists({
          channelId,
          pageToken: nextPageToken,
        })
      );
    }
  }, [dispatch, nextPageToken, channelId]);

  useEffect(() => {
    if (channelId && channelPlaylists.length === 0) {
      dispatch(fetchChannelPlaylists({ channelId }));
    }
  }, [channelId, channelPlaylists.length, dispatch]);

  return {
    channelPlaylists,
    status: asyncStatus,
    error,
    hasMore: !!nextPageToken,
    fetchMore,
  };
}
