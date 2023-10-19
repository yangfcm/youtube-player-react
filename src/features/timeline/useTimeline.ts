import { useEffect } from "react";
import { useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchTimeline, setTimelineMetaData } from "./timelineSlice";
import { db } from "../../settings/firebaseConfig";
import { TimelineMetaData } from "./types";

export function useTimeline(userId: string) {
  const dispatch = useAppDispatch();
  const { videos, status, error } = useSelector((state: RootState) => {
    return state.timeline;
  });

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = onSnapshot(doc(db, "timeline", userId), (doc) => {
      // console.log("fetch timeline!", doc.data());
      dispatch(setTimelineMetaData(doc.data() as TimelineMetaData));
      dispatch(fetchTimeline(userId));
    });
    return () => unsubscribe();
  }, [userId, dispatch]);

  return { videos, status, error };
}
