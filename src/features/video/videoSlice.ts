import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AsyncStatus } from "../../settings/types";
import { VideoResponse, VideoSnippetStats, VideosResponse } from "./types";
import { fetchVideoAPI, fetchVideosAPI } from "./videoAPI";

interface VideoState {
  videos: {
    status: AsyncStatus;
    error: SerializedError | null;
    mostPopular?: VideosResponse;
  };
  video: {
    status: AsyncStatus;
    item: VideoSnippetStats | null;
    error: SerializedError | null;
  };
}

const initialState: VideoState = {
  videos: {
    status: AsyncStatus.IDLE,
    error: null,
  },
  video: {
    status: AsyncStatus.IDLE,
    item: null,
    error: null,
  },
};

export const fetchVideo = createAsyncThunk(
  "video/fetchVideo",
  async (videoId: string) => {
    const response = await fetchVideoAPI(videoId);
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
      { payload }: { payload: AxiosResponse<VideoResponse, any> }
    ) => {
      state.video.status = AsyncStatus.SUCCESS;
      state.video.item = payload.data.items[0] || null;
      state.video.error = null;
    };
    const fetchVideoFailed = (
      state: VideoState,
      { error }: { error: SerializedError }
    ) => {
      state.video.status = AsyncStatus.FAIL;
      state.video.error = error;
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
      if (arg?.chart === "mostPopular") {
        const { etag, items, kind, nextPageToken, pageInfo } = payload.data;
        const currentItems = state.videos.mostPopular?.items || [];
        state.videos.mostPopular = {
          etag,
          kind,
          nextPageToken,
          pageInfo,
          items: [...currentItems, ...items],
        };
      }
    };
    const fetchVideosFailed = (
      state: VideoState,
      { error }: { error: SerializedError }
    ) => {
      state.videos.status = AsyncStatus.FAIL;
      state.videos.error = error;
    };

    builder
      .addCase(fetchVideo.pending, fetchVideoStart)
      .addCase(fetchVideo.fulfilled, fetchVideoSuccess)
      .addCase(fetchVideo.rejected, fetchVideoFailed)
      .addCase(fetchVideos.pending, fetchVideosStart)
      .addCase(fetchVideos.fulfilled, fetchVideosSuccess)
      .addCase(fetchVideos.rejected, fetchVideosFailed);
  },
});

export const videoReducer = videoSlice.reducer;
