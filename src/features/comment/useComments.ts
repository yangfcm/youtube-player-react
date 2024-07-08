import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import {
  fetchComments as fetchCommentsAction,
  setCommentOrder,
} from "./commentSlice";
import { CommentOrder } from "./types";

export function useComments(
  videoId: string,
  options: { initialFetch?: boolean } = {}
) {
  const { initialFetch = true } = options;
  const dispatch = useAppDispatch();
  const order =
    useSelector((state: RootState) => state.comment.comments[videoId]?.order) ||
    "relevance";
  const comments = useSelector(
    (state: RootState) => state.comment.comments[videoId]?.data[order]?.items
  );
  const asyncStatus = useSelector(
    (state: RootState) => state.comment.comments[videoId]?.status
  );
  const error = useSelector(
    (state: RootState) => state.comment.comments[videoId]?.error
  );
  const nextPageToken = useSelector(
    (state: RootState) =>
      state.comment.comments[videoId]?.data[order]?.nextPageToken
  );

  const fetchMore = useCallback(() => {
    if (nextPageToken) {
      dispatch(
        fetchCommentsAction({
          videoId,
          pageToken: nextPageToken,
          order,
        })
      );
    }
  }, [dispatch, nextPageToken, videoId, order]);

  const fetchComments = useCallback(() => {
    dispatch(fetchCommentsAction({ videoId, order }));
  }, [videoId, order, dispatch]);

  const setOrder = useCallback(
    (order: CommentOrder) => {
      dispatch(
        setCommentOrder({
          videoId,
          order,
        })
      );
    },
    [dispatch, videoId]
  );

  useEffect(() => {
    if (videoId && !comments && initialFetch) {
      fetchComments();
    }
  }, [videoId, comments, dispatch, order, fetchComments, initialFetch]);

  return {
    comments,
    status: asyncStatus,
    error,
    hasMore: !!nextPageToken,
    fetchMore,
    order,
    setOrder,
    fetchComments,
  };
}
