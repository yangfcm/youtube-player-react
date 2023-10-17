import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchTimeline } from "./timelineSlice";

export function useTimeline(userId: string) {
  const dispatch = useAppDispatch();
  const { videos, status, error } = useSelector((state: RootState) => {
    return state.timeline;
  });

  useEffect(() => {
    if (userId && videos.length === 0) {
      dispatch(fetchTimeline(userId));
    }
  }, [userId, videos.length, dispatch]);

  return { videos, status, error };
}
