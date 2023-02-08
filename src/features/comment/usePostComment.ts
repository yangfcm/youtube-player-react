import { useCallback } from "react";
import { useAppDispatch } from "../../app/hooks";
import { postVideoComment as postVideoCommentAction } from "./commentSlice";

export function usePostComment(videoId: string) {
  const dispatch = useAppDispatch();

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

  return { postVideoComment };
}
