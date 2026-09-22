import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import {
  archiveTimelineVideo as archiveTimelineVideoAction,
  resetArchiveStatus,
} from "./timelineSlice";

export function useArchiveTimelineVideo(userId: string) {
  const dispatch = useAppDispatch();
  const { archiveStatus: status, archiveError: error } = useSelector(
    (state: RootState) => state.timeline
  );

  const archiveVideo = useCallback(
    (videoId: string) => {
      dispatch(archiveTimelineVideoAction({ userId, videoId }));
    },
    [userId, dispatch]
  );

  const reset = useCallback(() => {
    dispatch(resetArchiveStatus());
  }, [dispatch]);

  return { archiveVideo, status, error, reset };
}
