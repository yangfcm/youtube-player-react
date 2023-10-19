import { useCallback, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { doc, onSnapshot } from "firebase/firestore";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchTimeline, setTimelineMetaData } from "./timelineSlice";
import { db } from "../../settings/firebaseConfig";
import { TimelineMetaData } from "./types";

export function useTimeline(userId: string) {
  const dispatch = useAppDispatch();
  const { videos, status, error, meta } = useSelector((state: RootState) => {
    return state.timeline;
  });

  const hasMore = useMemo(() => {
    return (meta?.totalCount || 0) > videos.length;
  }, [videos, meta?.totalCount]);

  const fetchMore = useCallback(() => {
    const lastItem = videos[videos.length - 1];
    console.log(lastItem);
    dispatch(
      fetchTimeline({
        userId,
        after: lastItem.id,
        way: "APPEND",
      })
    );
  }, [userId, videos, dispatch]);

  useEffect(() => {
    if (!userId) return;
    const unsubscribe = onSnapshot(doc(db, "timeline", userId), (doc) => {
      const newMeta = doc.data() as TimelineMetaData;
      // console.log("fetch timeline!", doc.data());
      if (meta?.totalCount === newMeta.totalCount) return; // If the
      if (meta?.totalCount && newMeta.totalCount > meta.totalCount) {
        const diff = newMeta.totalCount - meta.totalCount;
        dispatch(fetchTimeline({ userId, maxResults: diff, way: "TOP" }));
      } else {
        dispatch(fetchTimeline({ userId }));
      }
      dispatch(setTimelineMetaData(newMeta));
    });
    return () => unsubscribe();
  }, [userId, dispatch, meta?.totalCount]);

  return { videos, status, error, hasMore, fetchMore };
}
