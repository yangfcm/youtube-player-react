import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchVideoInfo } from "./videoSlice";

export function useVideo(videoId?: string) {
  const dispatch = useAppDispatch();
  const video = useSelector((state: RootState) => {
    if (videoId) return state.video.video.item[videoId];
  });
  const asyncStatus = useSelector(
    (state: RootState) => state.video.video.status
  );
  const error = useSelector((state: RootState) => state.video.video.error);

  useEffect(() => {
    if (videoId && !video) {
      dispatch(fetchVideoInfo(videoId));
    }
    // eslint-disable-next-line
  }, [videoId]);

  return {
    status: asyncStatus,
    error,
    video,
  };
}
