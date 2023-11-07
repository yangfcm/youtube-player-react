import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { DownloadFileType, VideoState } from "./types";

export const getVideoById = createSelector(
  (state: RootState) => state,
  (state: RootState, videoId: string) => videoId,
  (state: RootState, videoId: string) => state.video.video.item[videoId]
);

export const getVideoDownloadState = createSelector(
  (state: RootState) => state.video,
  (state: RootState, {videoId, filter}: {videoId: string, filter: DownloadFileType}) => ({videoId, filter}),
  (videoState: VideoState, {videoId, filter}: {videoId: string, filter: DownloadFileType}) => {
    const key = filter === 'audioonly' ? 'downloadAudioonly' : 'downloadVideo';
    return videoState.video.item[videoId][key] || {};
  }
);