import { useCallback, useEffect } from "react";
import axios from "axios";
import { shallowEqual, useSelector } from "react-redux";
import { useAppDispatch, usePoll } from "../../app/hooks";
import { downloadVideo as downloadVideoAction } from "./videoSlice";
import { DownloadParameter } from "./types";
import { RootState } from "../../app/store";
import { getVideoDownloadState } from "./selectors";
import { DOWNLOAD_CANCELD_ERROR } from "../../settings/constant";
import { AsyncStatus } from "../../settings/types";

export function useDownloadVideo({
  videoId,
  title,
  userId,
  filter,
}: DownloadParameter) {
  const cancelTokenSource = axios.CancelToken.source();
  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      cancelTokenSource.cancel(DOWNLOAD_CANCELD_ERROR);
    };
    // eslint-disable-next-line
  }, []);

  const downloadState = useSelector(
    (state: RootState) => getVideoDownloadState(state, { videoId, filter }),
    shallowEqual
  );
  const { url, expiredAt, status, error } = downloadState;

  usePoll(
    () => {
      if (status === AsyncStatus.LOADING) {
        console.log("called!");
      }
    },
    { interval: 1000 },
    status
  );

  const downloadVideo = useCallback(() => {
    dispatch(
      downloadVideoAction({
        videoId,
        title,
        userId,
        filter,
        cancelToken: cancelTokenSource.token,
      })
    );
  }, [videoId, title, userId, filter, dispatch, cancelTokenSource]);

  return {
    url,
    expiredAt,
    status,
    error,
    downloadVideo,
    isUrlExpired: Date.now() > (expiredAt || 0),
  };
}
