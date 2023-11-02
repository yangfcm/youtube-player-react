import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AsyncStatus } from "../../settings/types";
import { VideosResponse, VideoState, VideoInfoResponse, DownloadResponse, DownloadParameter, DownloadState } from "./types";
import { fetchVideosAPI, fetchVideoInfoAPI, downloadVideoAPI } from "./videoAPI";
import { DEFAULT_ERROR_MESSAGE } from "../../settings/constant";

const initialState: VideoState = {
  videos: {
    status: AsyncStatus.IDLE,
    error: "",
  },
  video: {
    status: AsyncStatus.IDLE,
    item: {},
    error: "",
  },
};

export const fetchVideo = createAsyncThunk(
  "video/fetchVideo",
  async (videoId: string) => {
    const response = await fetchVideoInfoAPI(videoId);
    return response;
  }
);

export const fetchVideos = createAsyncThunk(
  "video/fetchVideos",
  async (filter?: Record<string, string>) => {
    const response = await fetchVideosAPI(filter);
    return response;
  }
);

export const downloadVideo = createAsyncThunk(
  'video/downloadVideo',
  async(para: DownloadParameter) => {
    const response = await downloadVideoAPI(para);
    return response;
  }
)

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const fetchVideoStart = (state: VideoState) => {
      state.video.status = AsyncStatus.LOADING;
    };
    const fetchVideoSuccess = (
      state: VideoState,
      { payload }: { payload: AxiosResponse<VideoInfoResponse> }
    ) => {
      state.video.status = AsyncStatus.SUCCESS;
      state.video.error = "";
      const video = payload.data;
      if (video) {
        state.video.item = {
          ...state.video.item,
          [video.videoId as string]: video,
        };
      }
    };
    const fetchVideoFailed = (
      state: VideoState,
      { error }: { error: SerializedError }
    ) => {
      state.video.status = AsyncStatus.FAIL;
      state.video.error = error.message || DEFAULT_ERROR_MESSAGE;
    };

    const fetchVideosStart = (state: VideoState) => {
      state.videos.status = AsyncStatus.LOADING;
    };
    const fetchVideosSuccess = (
      state: VideoState,
      {
        payload,
        meta: { arg },
      }: {
        payload: AxiosResponse<VideosResponse>;
        meta: { arg?: Record<string, string> };
      }
    ) => {
      state.videos.status = AsyncStatus.SUCCESS;
      state.videos.error = "";
      if (arg?.chart === "mostPopular") {
        // Received most popular videos.
        const currentItems = state.videos.mostPopular?.items || [];
        state.videos.mostPopular = {
          ...payload.data,
          items: [...currentItems, ...payload.data.items],
        };
      }
    };
    const fetchVideosFailed = (
      state: VideoState,
      { error }: { error: SerializedError }
    ) => {
      state.videos.status = AsyncStatus.FAIL;
      state.videos.error = error.message || DEFAULT_ERROR_MESSAGE;
    };

    const downloadVideoStart = (state: VideoState, {meta: { arg }}: {
      meta: { arg: DownloadParameter }
    }) => {
      const videoItem = state.video.item[arg.videoId];
      if(!videoItem) return;
      const downloadState: DownloadState = {
        status: AsyncStatus.LOADING,
        error: '',
      };
      switch(arg.filter) {
        case 'video':
          videoItem.downloadVideo = downloadState;
          break;
        case 'audioonly':
          videoItem.downloadAudioonly = downloadState;
          break;
        default:
          return;
      }
    };
    const downloadVideoFailed = (
      state: VideoState, 
      { error, meta: {arg} }: { error: SerializedError, meta: { arg: DownloadParameter}}
    ) => {
      const videoItem = state.video.item[arg.videoId];
      if(!videoItem) return;
      const downloadState: DownloadState = {
        status: AsyncStatus.FAIL,
        error: error.message || DEFAULT_ERROR_MESSAGE
      };
      switch(arg.filter) {
        case 'video':
          videoItem.downloadVideo = downloadState;
          break;
        case 'audioonly':
          videoItem.downloadAudioonly = downloadState;
          break;
        default:
          return;
      }
    };
    const downloadVideoSuccess = (
      state: VideoState, 
      { payload, meta: { arg }}: { payload: AxiosResponse<DownloadResponse>, meta: { arg: DownloadParameter }}
    ) => {
      const videoItem = state.video.item[arg.videoId];
      if(!videoItem) return;
      const downloadState: DownloadState = {
        status: AsyncStatus.SUCCESS,
        error: '',
        url: payload.data.url,
        expiredAt: payload.data.expiredAt,
      };
      switch(arg.filter) {
        case 'video':
          videoItem.downloadVideo = downloadState;
          break;
        case 'audioonly':
          videoItem.downloadAudioonly = downloadState;
          break;
        default:
          return;
      }
    };

    builder
      .addCase(fetchVideo.pending, fetchVideoStart)
      .addCase(fetchVideo.fulfilled, fetchVideoSuccess)
      .addCase(fetchVideo.rejected, fetchVideoFailed)
      .addCase(fetchVideos.pending, fetchVideosStart)
      .addCase(fetchVideos.fulfilled, fetchVideosSuccess)
      .addCase(fetchVideos.rejected, fetchVideosFailed)
      .addCase(downloadVideo.pending, downloadVideoStart)
      .addCase(downloadVideo.fulfilled, downloadVideoSuccess)
      .addCase(downloadVideo.rejected, downloadVideoFailed)
      ;
  },
});

export const videoReducer = videoSlice.reducer;
