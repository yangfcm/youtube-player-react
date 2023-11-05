import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { doc, onSnapshot } from "firebase/firestore";
import { shallowEqual, useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { downloadVideo as downloadVideoAction } from "./videoSlice";
import { DownloadParameter } from "./types";
import { RootState } from "../../app/store";
import { getVideoDownloadState } from "./selectors";
import { DOWNLOAD_CANCELD_ERROR } from "../../settings/constant";
import { db } from "../../settings/firebaseConfig";
import { AsyncStatus } from "../../settings/types";

export function useDownloadVideo({
  videoId,
  title,
  userId,
  filter,
}: DownloadParameter) {
  const cancelTokenSource = axios.CancelToken.source();
  const dispatch = useAppDispatch();
  const [progress, setProgress] = useState(0);
  const downloadState = useSelector(
    (state: RootState) => getVideoDownloadState(state, { videoId, filter }),
    shallowEqual
  );
  const { url, expiredAt, status, error } = downloadState;

  useEffect(() => {
    return () => {
      cancelTokenSource.cancel(DOWNLOAD_CANCELD_ERROR);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, "downloadProgress", `${videoId}_${userId}_${filter}`),
      (doc) => {
        const data = doc.data() as { progress: number };
        if (
          (status === AsyncStatus.IDLE || status === AsyncStatus.FAIL) &&
          progress !== 0
        ) {
          setProgress(0);
        }
        if (status === AsyncStatus.LOADING && data?.progress > progress) {
          setProgress(data.progress);
        }
        if (status === AsyncStatus.SUCCESS && progress !== 100) {
          setProgress(100);
        }
      }
    );
    return () => unsubscribe();
    // eslint-disable-next-line
  }, [status, videoId]);

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
    downloadProgress: progress,
  };
}
