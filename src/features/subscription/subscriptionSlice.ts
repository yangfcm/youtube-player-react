import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { AsyncStatus } from "../../settings/types";
import { DEFAULT_ERROR_MESSAGE } from "../../settings/constant";
import { Channel, SubscriptionState } from "./types";
import {
  fetchSubscribedChannelsAPI,
  subscribeChannelAPI,
  unsubscribeChannelAPI,
} from "./subscriptionAPI";

const initialState: SubscriptionState = {
  status: AsyncStatus.IDLE,
  error: "",
  channels: [],
  ids: {},
  pending: {},
  errors: {},
};

export const fetchSubscribedChannels = createAsyncThunk(
  "subscription/fetchSubscribedChannels",
  async (userId: string) => await fetchSubscribedChannelsAPI(userId),
  {
    // Several SubscribeButtons can mount at once - only let one fetch through.
    condition: (_userId, { getState }) =>
      (getState() as RootState).subscription.status !== AsyncStatus.LOADING,
  }
);

export const subscribeChannel = createAsyncThunk(
  "subscription/subscribeChannel",
  async ({ userId, channel }: { userId: string; channel: Channel }) => {
    await subscribeChannelAPI(userId, channel);
    return channel;
  }
);

export const unsubscribeChannel = createAsyncThunk(
  "subscription/unsubscribeChannel",
  async ({ userId, channelId }: { userId: string; channelId: string }) => {
    await unsubscribeChannelAPI(userId, channelId);
    return channelId;
  }
);

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    resetSubscriptions: () => initialState,
  },
  extraReducers: (builder) => {
    const fetchSubscribedChannelsStart = (state: SubscriptionState) => {
      state.status = AsyncStatus.LOADING;
      state.error = "";
    };
    const fetchSubscribedChannelsSuccess = (
      state: SubscriptionState,
      { payload }: { payload: Channel[] }
    ) => {
      state.status = AsyncStatus.SUCCESS;
      state.error = "";
      state.channels = payload;
      state.ids = {};
      payload.forEach((channel) => (state.ids[channel.id] = true));
    };
    const fetchSubscribedChannelsFailed = (
      state: SubscriptionState,
      { error }: { error: SerializedError }
    ) => {
      state.status = AsyncStatus.FAIL;
      state.error = error.message || DEFAULT_ERROR_MESSAGE;
    };

    const subscribeStart = (
      state: SubscriptionState,
      { meta: { arg } }: { meta: { arg: { channel: Channel } } }
    ) => {
      state.pending[arg.channel.id] = true;
      state.errors[arg.channel.id] = "";
    };
    const subscribeSuccess = (
      state: SubscriptionState,
      { payload }: { payload: Channel }
    ) => {
      state.pending[payload.id] = false;
      state.ids[payload.id] = true;
      if (!state.channels.some((channel) => channel.id === payload.id)) {
        state.channels.unshift(payload);
      }
    };
    const subscribeFailed = (
      state: SubscriptionState,
      {
        meta: { arg },
        error,
      }: { meta: { arg: { channel: Channel } }; error: SerializedError }
    ) => {
      state.pending[arg.channel.id] = false;
      state.errors[arg.channel.id] = error.message || DEFAULT_ERROR_MESSAGE;
    };

    const unsubscribeStart = (
      state: SubscriptionState,
      { meta: { arg } }: { meta: { arg: { channelId: string } } }
    ) => {
      state.pending[arg.channelId] = true;
      state.errors[arg.channelId] = "";
    };
    const unsubscribeSuccess = (
      state: SubscriptionState,
      { payload }: { payload: string }
    ) => {
      state.pending[payload] = false;
      state.ids[payload] = false;
      state.channels = state.channels.filter(
        (channel) => channel.id !== payload
      );
    };
    const unsubscribeFailed = (
      state: SubscriptionState,
      {
        meta: { arg },
        error,
      }: { meta: { arg: { channelId: string } }; error: SerializedError }
    ) => {
      state.pending[arg.channelId] = false;
      state.errors[arg.channelId] = error.message || DEFAULT_ERROR_MESSAGE;
    };

    builder
      .addCase(fetchSubscribedChannels.pending, fetchSubscribedChannelsStart)
      .addCase(fetchSubscribedChannels.fulfilled, fetchSubscribedChannelsSuccess)
      .addCase(fetchSubscribedChannels.rejected, fetchSubscribedChannelsFailed)
      .addCase(subscribeChannel.pending, subscribeStart)
      .addCase(subscribeChannel.fulfilled, subscribeSuccess)
      .addCase(subscribeChannel.rejected, subscribeFailed)
      .addCase(unsubscribeChannel.pending, unsubscribeStart)
      .addCase(unsubscribeChannel.fulfilled, unsubscribeSuccess)
      .addCase(unsubscribeChannel.rejected, unsubscribeFailed);
  },
});

export const { resetSubscriptions } = subscriptionSlice.actions;

export const subscriptionReducer = subscriptionSlice.reducer;
