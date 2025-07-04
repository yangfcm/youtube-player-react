import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AsyncStatus } from "../../settings/types";
import { VideosResponse, VideoState, VideoResponse } from "./types";
import { fetchVideosAPI, fetchVideoAPI } from "./videoAPI";
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
      { payload }: { payload: AxiosResponse<VideoResponse> }
    ) => {
      state.video.status = AsyncStatus.SUCCESS;
      state.video.error = "";
      const videoResponse = payload.data;
      if (videoResponse) {
        const video = videoResponse.items[0];
        state.video.item = {
          ...state.video.item,
          [video.id as string]: video,
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
