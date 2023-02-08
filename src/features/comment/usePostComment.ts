import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";
import { postVideoComment as postVideoCommentAction } from "./commentSlice";
import { getVideoById } from "../video/selectors";

export function usePostComment(videoId: string) {
  const dispatch = useAppDispatch();
  const video = useSelector((state: RootState) => getVideoById(state, videoId));
  const channelId = video?.snippet.channelId;

  const postVideoComment = useCallback(
    (comment: string) => {
      if (channelId) {
        dispatch(
          postVideoCommentAction({
            channelId,
            videoId,
            comment,
          })
        );
      }
    },
    [channelId, videoId, dispatch]
  );

  return { postVideoComment };
}
