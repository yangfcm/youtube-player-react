import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchTimeline } from "./timelineSlice";

export function useTimeline(userId: string) {
  const dispatch = useAppDispatch();
  const timelineState = useSelector((state: RootState) => {
    return state.timeline;
  });

  useEffect(() => {
    if (userId) {
      dispatch(fetchTimeline(userId));
    }
  }, [userId, dispatch]);

  return timelineState;
}
