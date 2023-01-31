import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchReplies } from "./commentSlice";

export function useCommentReplies(commentId: string) {
  const dispatch = useAppDispatch();
  const replies = useSelector(
    (state: RootState) => state.comment.replies[commentId]?.data?.items
  );
  const asyncStatus = useSelector(
    (state: RootState) => state.comment.replies[commentId]?.status
  );
  const error = useSelector(
    (state: RootState) => state.comment.replies[commentId]?.error
  );
  const nextPageToken = useSelector(
    (state: RootState) => state.comment.replies[commentId]?.data?.nextPageToken
  );

  const fetchMore = useCallback(() => {
    if (nextPageToken) {
      dispatch(
        fetchReplies({
          commentId,
          pageToken: nextPageToken,
        })
      );
    }
  }, [dispatch, nextPageToken, commentId]);

  const fetchCommentReplies = useCallback(() => {
    if (commentId) {
      dispatch(fetchReplies({ commentId }));
    }
  }, [dispatch, commentId]);

  return {
    replies: replies,
    status: asyncStatus,
    error,
    hasMore: !!nextPageToken,
    fetchMore,
    fetchCommentReplies,
  };
}
