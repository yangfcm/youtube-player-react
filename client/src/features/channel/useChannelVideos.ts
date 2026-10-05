import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchChannelVideos } from "./channelSlice";

export function useChannelVideos(channelId: string) {
  const dispatch = useAppDispatch();
  const asyncStatus = useSelector(
    (state: RootState) => state.channel.videos.status
  );
  const error = useSelector((state: RootState) => state.channel.videos.error);

  const channelVideos = useSelector((state: RootState) =>
    state.channel.videos.data[channelId]?.items.map((item) => ({
      ...item,
      id: item.snippet.resourceId || {},
    }))
  );
  const uploadPlaylistId = useSelector(
    (state: RootState) =>
      state.channel.profile.data[channelId]?.contentDetails.relatedPlaylists
        .uploads
  );
  const nextPageToken = useSelector(
    (state: RootState) => state.channel.videos.data[channelId]?.nextPageToken
  );

  const fetchMore = useCallback(() => {
    if (nextPageToken) {
      dispatch(
        fetchChannelVideos({
          channelId,
          pageToken: nextPageToken,
          uploadPlaylistId,
        })
      );
    }
  }, [dispatch, nextPageToken, channelId, uploadPlaylistId]);

  useEffect(() => {
    if (channelId && !channelVideos && uploadPlaylistId) {
      dispatch(fetchChannelVideos({ channelId, uploadPlaylistId }));
    }
  }, [channelId, channelVideos, dispatch, uploadPlaylistId]);

  return {
    channelVideos,
    status: asyncStatus,
    error,
    hasMore: !!nextPageToken,
    fetchMore,
  };
}
