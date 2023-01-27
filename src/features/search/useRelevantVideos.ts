import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchResults } from "./searchSlice";

export function useRelevantVideos(videoId: string) {
  const dispatch = useAppDispatch();
  const relevantVideos = useSelector(
    (state: RootState) => state.search.relevantVideos[videoId]
  );
  const asyncStatus = useSelector((state: RootState) => state.search.status);
  const error = useSelector((state: RootState) => state.search.error);

  useEffect(() => {
    if (!relevantVideos) {
      dispatch(
        fetchResults({
          relatedToVideoId: videoId,
        })
      );
    }
  }, [videoId]);

  return {
    videos: relevantVideos,
    status: asyncStatus,
    error: error?.message || "",
  };
}
