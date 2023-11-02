import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { downloadVideo as downloadVideoAction } from "./videoSlice";
import { DownloadParameter } from "./types";
import { RootState } from "../../app/store";

export function useDownloadVideo({videoId, title, userId, filter}: DownloadParameter) {
  const dispatch = useAppDispatch();
  const { url, expiredAt, status, error } = useSelector((state: RootState) => {
    const video = state.video.video.item[videoId];
    const key = filter === 'audioonly' ? 'downloadAudioonly' : 'downloadVideo';
    return video?.[key] || {};
  });

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