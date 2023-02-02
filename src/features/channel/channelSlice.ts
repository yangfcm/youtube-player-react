import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AsyncStatus } from "../../settings/types";
import { fetchChannelProfileAPI } from "./channelAPI";
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
    data: Record<string, any>;
  };
  playlists: {
    status: AsyncStatus;
    error: string;
    data: Record<string, any>;
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

    builder
      .addCase(fetchChannelProfile.pending, fetchChannelProfileStart)
      .addCase(fetchChannelProfile.fulfilled, fetchChannelProfileSuccess)
      .addCase(fetchChannelProfile.rejected, fetchChannelProfileFailed);
  },
});

export const channelReducer = channelSlice.reducer;
