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

  const channelVideos = useSelector(
    (state: RootState) => state.channel.videos.data[channelId]?.items
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
        })
      );
    }
  }, [dispatch, nextPageToken, channelId]);

  useEffect(() => {
    if (channelId && !channelVideos) {
      dispatch(fetchChannelVideos({ channelId }));
    }
  }, [channelId, channelVideos, dispatch]);

  return {
    channelVideos,
    status: asyncStatus,
    error,
    hasMore: !!nextPageToken,
    fetchMore,
  };
}
