import { useCallback } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { useAppDispatch } from "../../app/hooks";
import { postVideoComment as postVideoCommentAction } from "./commentSlice";

export function usePostComment(videoId: string) {
  const dispatch = useAppDispatch();

  const asyncStatus = useSelector(
    (state: RootState) => state.comment.comments[videoId]?.status
  );
  const error = useSelector(
    (state: RootState) => state.comment.comments[videoId]?.error
  );

  const postVideoComment = useCallback(
    (comment: string) => {
      if (videoId) {
        dispatch(
          postVideoCommentAction({
            videoId,
            comment,
          })
        );
      }
    },
    [videoId, dispatch]
  );

  return { postVideoComment, status: asyncStatus, error };
}
