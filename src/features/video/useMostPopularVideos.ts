import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchVideos } from "./videoSlice";

export function useMostPopularVideos() {
  const dispatch = useAppDispatch();
  const mostPopularVideos = useSelector(
    (state: RootState) => state.video.videos.mostPopular?.items
  );
  const asyncStatus = useSelector(
    (state: RootState) => state.video.videos.status
  );
  const error = useSelector((state: RootState) => state.video.videos.error);
  const nextPageToken = useSelector(
    (state: RootState) => state.video.videos.mostPopular?.nextPageToken
  );

  const fetchMore = useCallback(() => {
    if (nextPageToken) {
      dispatch(fetchVideos({ chart: "mostPopular", pageToken: nextPageToken }));
    }
  }, [nextPageToken, dispatch]);

  useEffect(() => {
    if (!mostPopularVideos || mostPopularVideos.length === 0) {
      dispatch(fetchVideos({ chart: "mostPopular" }));
    }
  }, []);

  return {
    mostPopularVideos,
    status: asyncStatus,
    error,
    fetchMore,
    hasMore: !!nextPageToken,
  };
}
