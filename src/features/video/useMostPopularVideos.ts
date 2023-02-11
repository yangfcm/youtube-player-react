import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchVideos } from "./videoSlice";

export function useMostPopularVideos() {
  const dispatch = useAppDispatch();
  const region = useSelector((state: RootState) => state.setting.location);
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
    if (nextPageToken && region) {
      dispatch(
        fetchVideos({
          chart: "mostPopular",
          pageToken: nextPageToken,
          regionCode: region,
        })
      );
    }
  }, [nextPageToken, dispatch, region]);

  useEffect(() => {
    if (region && (!mostPopularVideos || mostPopularVideos.length === 0)) {
      dispatch(
        fetchVideos({
          chart: "mostPopular",
          regionCode: region,
        })
      );
    }
  }, [dispatch, mostPopularVideos, region]);

  return {
    mostPopularVideos,
    status: asyncStatus,
    error,
    fetchMore,
    hasMore: !!nextPageToken,
  };
}
