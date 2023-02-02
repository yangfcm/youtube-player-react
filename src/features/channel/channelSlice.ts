import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AsyncStatus } from "../../settings/types";
import { PlayListsResponse } from "../playlist/types";
import { VideosSnippetResponse } from "../video/types";
import {
  fetchChannelPlaylistsAPI,
  fetchChannelProfileAPI,
  fetchChannelVideosAPI,
} from "./channelAPI";
import { ChannelDetails, ChannelDetailsResponse } from "./types";

export interface ChannelState {
  profile: {
    status: AsyncStatus;
    error: string;
    data: Record<string, ChannelDetails>;
  };
  videos: {
    status: AsyncStatus;
    error: string;
    data: Record<string, VideosSnippetResponse>;
  };
  playlists: {
    status: AsyncStatus;
    error: string;
    data: Record<string, PlayListsResponse>;
  };
}

const initialState: ChannelState = {
  profile: {
    status: AsyncStatus.IDLE,
    error: "",
    data: {},
  },
  videos: {
    status: AsyncStatus.IDLE,
    error: "",
    data: {},
  },
  playlists: {
    status: AsyncStatus.IDLE,
    error: "",
    data: {},
  },
};

export const fetchChannelProfile = createAsyncThunk(
  "channel/fetchChannelProfile",
  async ({ channelId }: { channelId: string }) => {
    const response = await fetchChannelProfileAPI(channelId);
    return response;
  }
);

export const fetchChannelVideos = createAsyncThunk(
  "channel/fetchChannelVideos",
  async (args: { channelId: string; [key: string]: string }) => {
    const { channelId, ...options } = args;
    const response = await fetchChannelVideosAPI(channelId, options);
    return response;
  }
);
export const fetchChannelPlaylists = createAsyncThunk(
  "channel/fetchChannelPlaylists",
  async (args: { channelId: string; [key: string]: string }) => {
    const { channelId, ...options } = args;
    const response = await fetchChannelPlaylistsAPI(channelId, options);
    return response;
  }
);

export const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const fetchChannelProfileStart = (state: ChannelState) => {
      state.profile.status = AsyncStatus.LOADING;
    };
    const fetchChannelProfileSuccess = (
      state: ChannelState,
      {
        payload,
        meta: { arg },
      }: {
        payload: AxiosResponse<ChannelDetailsResponse>;
        meta: { arg: { channelId: string } };
      }
    ) => {
      const { channelId } = arg;
      state.profile.status = AsyncStatus.SUCCESS;
      state.profile.error = "";
      state.profile.data[channelId] =
        payload.data.items && payload.data.items[0];
    };
    const fetchChannelProfileFailed = (
      state: ChannelState,
      { error }: { error: SerializedError }
    ) => {
      state.profile.status = AsyncStatus.FAIL;
      state.profile.error = error.message || "";
    };

    const fetchChannelVideosStart = (state: ChannelState) => {
      state.videos.status = AsyncStatus.LOADING;
    };
    const fetchChannelVideosSuccess = (
      state: ChannelState,
      {
        payload,
        meta: { arg },
      }: {
        payload: AxiosResponse<VideosSnippetResponse>;
        meta: { arg: { channelId: string } };
      }
    ) => {
      const { channelId } = arg;
      const currentItems = state.videos.data[channelId]?.items || [];
      state.videos.status = AsyncStatus.SUCCESS;
      state.videos.error = "";
      state.videos.data[channelId] = {
        ...payload.data,
        items: [...currentItems, ...payload.data.items],
      };
    };
    const fetchChannelVideosFailed = (
      state: ChannelState,
      { error }: { error: SerializedError }
    ) => {
      state.videos.status = AsyncStatus.FAIL;
      state.videos.error = error.message || "";
    };

    const fetchChannelPlaylistsStart = (state: ChannelState) => {
      state.playlists.status = AsyncStatus.LOADING;
    };
    const fetchChannelPlaylistsSuccess = (
      state: ChannelState,
      {
        payload,
        meta: { arg },
      }: {
        payload: AxiosResponse<PlayListsResponse>;
        meta: { arg: { channelId: string } };
      }
    ) => {
      const { channelId } = arg;
      const currentItems = state.playlists.data[channelId]?.items || [];
      state.playlists.status = AsyncStatus.SUCCESS;
      state.playlists.error = "";
      state.playlists.data[channelId] = {
        ...payload.data,
        items: [...currentItems, ...payload.data.items],
      };
    };
    const fetchChannelPlaylistsFailed = (
      state: ChannelState,
      { error }: { error: SerializedError }
    ) => {
      state.playlists.status = AsyncStatus.FAIL;
      state.playlists.error = error.message || "";
    };

    builder
      .addCase(fetchChannelProfile.pending, fetchChannelProfileStart)
      .addCase(fetchChannelProfile.fulfilled, fetchChannelProfileSuccess)
      .addCase(fetchChannelProfile.rejected, fetchChannelProfileFailed)
      .addCase(fetchChannelVideos.pending, fetchChannelVideosStart)
      .addCase(fetchChannelVideos.fulfilled, fetchChannelVideosSuccess)
      .addCase(fetchChannelVideos.rejected, fetchChannelVideosFailed)
      .addCase(fetchChannelPlaylists.pending, fetchChannelPlaylistsStart)
      .addCase(fetchChannelPlaylists.fulfilled, fetchChannelPlaylistsSuccess)
      .addCase(fetchChannelPlaylists.rejected, fetchChannelPlaylistsFailed);
  },
});

export const channelReducer = channelSlice.reducer;
