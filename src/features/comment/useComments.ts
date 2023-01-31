import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchComments } from "./commentSlice";

export function useComments(videoId: string) {
  const dispatch = useAppDispatch();
  const comments = useSelector(
    (state: RootState) => state.comment.comments[videoId]?.data?.items
  );
  const asyncStatus = useSelector(
    (state: RootState) => state.comment.comments[videoId]?.status
  );
  const error = useSelector(
    (state: RootState) => state.comment.comments[videoId]?.error
  );
  const nextPageToken = useSelector(
    (state: RootState) => state.comment.comments[videoId]?.data?.nextPageToken
  );

  const fetchMore = useCallback(() => {
    if (nextPageToken) {
      dispatch(
        fetchComments({
          videoId,
          pageToken: nextPageToken,
        })
      );
    }
  }, [dispatch, nextPageToken, videoId]);

  useEffect(() => {
    if (videoId && (!comments || comments.length === 0)) {
      dispatch(fetchComments({ videoId }));
    }
  }, [videoId, comments, dispatch]);

  return {
    comments,
    status: asyncStatus,
    error,
    hasMore: !!nextPageToken,
    fetchMore,
  };
}
