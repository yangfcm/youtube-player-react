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
      const meta = doc.data() as TimelineMetaData;
      dispatch(setTimelineMetaData(meta));
    });
    return () => unsubscribe();
  }, [userId, dispatch]);

  useEffect(() => {
    if (!userId || !meta?.totalCount) return;
    dispatch(
      fetchTimeline({
        userId,
        maxResults: videos.length === 0 ? undefined : videos.length,
      })
    );
  }, [userId, dispatch, meta?.totalCount, videos.length]);

  return { videos, status, error, hasMore, fetchMore, meta };
}
