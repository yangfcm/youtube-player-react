import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import {
  toggleHideTimelineVideo as toggleHideTimelineVideoAction,
  resetHideStatus,
} from "./timelineSlice";

export function useToggleHideTimelineVideo(userId: string) {
  const dispatch = useAppDispatch();
  const { hideStatus: status, hideError: error } = useSelector(
    (state: RootState) => state.timeline,
  );

  const hideVideo = useCallback(
    (videoId: string) => {
      dispatch(
        toggleHideTimelineVideoAction({ userId, videoId, isActive: false }),
      );
    },
    [userId, dispatch],
  );

  const unHideVideo = useCallback(
    (videoId: string) => {
      dispatch(
        toggleHideTimelineVideoAction({ userId, videoId, isActive: true }),
      );
    },
    [userId, dispatch],
  );

  const reset = useCallback(() => {
    dispatch(resetHideStatus());
  }, [dispatch]);

  return { hideVideo, unHideVideo, status, error, reset };
}
