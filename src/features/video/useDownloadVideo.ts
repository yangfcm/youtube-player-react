import { useCallback } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { downloadVideo as downloadVideoAction } from "./videoSlice";
import { DownloadParameter } from "./types";
import { RootState } from "../../app/store";
import { getVideoDownloadState } from "./selectors";

export function useDownloadVideo({videoId, title, userId, filter}: DownloadParameter) {
  const dispatch = useAppDispatch();
  
  const downloadState = useSelector((state: RootState) => getVideoDownloadState(state, { videoId, filter }), shallowEqual);
  const { url, expiredAt, status, error } = downloadState;
 
  const downloadVideo = useCallback(() => {
    dispatch(downloadVideoAction({
      videoId, title, userId, filter,
    }));
  }, [videoId, title, userId, filter, dispatch]);

  return {
    url,
    expiredAt,
    status,
    error,
    downloadVideo,
    isUrlExpired: Date.now() > (expiredAt || 0),
  };

}