import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AsyncStatus } from "../../settings/types";
import { VideoResponse, VideoSnippetStats } from "./types";
import { fetchVideoAPI } from "./videoAPI";

interface VideoState {
  videos: {
    status: AsyncStatus;
    items: VideoSnippetStats[];
    error: SerializedError | null;
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
    items: [],
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
    const response: AxiosResponse<VideoResponse> = await fetchVideoAPI(videoId);
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

    builder
      .addCase(fetchVideo.pending, fetchVideoStart)
      .addCase(fetchVideo.fulfilled, fetchVideoSuccess)
      .addCase(fetchVideo.rejected, fetchVideoFailed);
  },
});

export const videoReducer = videoSlice.reducer;
