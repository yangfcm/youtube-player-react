import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { VideoSnippet } from "../video/types";
import { fetchResults } from "./searchSlice";

export function useRelevantVideos(videoId: string) {
  const dispatch = useAppDispatch();
  const relevantVideos = useSelector(
    (state: RootState) => state.search.relevantVideos[videoId]?.items
  );
  const asyncStatus = useSelector((state: RootState) => state.search.status);
  const error = useSelector((state: RootState) => state.search.error);

  useEffect(() => {
    if (!relevantVideos) {
      dispatch(
        fetchResults({
          relatedToVideoId: videoId,
          type: "video",
        })
      );
    }
  }, [videoId, dispatch, relevantVideos]);

  return {
    videos: relevantVideos as VideoSnippet[],
    status: asyncStatus,
    error: error?.message || "",
  };
}
