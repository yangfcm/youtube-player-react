import {
  createSlice,
  PayloadAction,
  createSelector,
  createAsyncThunk,
  SerializedError,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { RootState } from "../../app/store";
import { AsyncStatus } from "../../settings/types";
import { PlayListsResponse } from "../playlist/types";
import { SubscriptionsResponse } from "./types";
import {
  fetchPlayListsAPI,
  fetchSubscriptionIdAPI,
  fetchSubscriptionsAPI,
} from "./userAPI";
import { DEFAULT_ERROR_MESSAGE } from "../../settings/constant";

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  lastName: string;
  firstName: string;
  avatar: string;
}

interface UserState {
  profile: UserProfile | null;
  token: string;
  expiresAt: number;
  subscriptions: {
    status: AsyncStatus;
    error: string;
    data?: SubscriptionsResponse;
    subscriptionIds: Record<string, string>;
  };
  playlists: {
    status: AsyncStatus;
    error: string;
    data?: PlayListsResponse;
  };
}

const initialState: UserState = {
  profile: null,
  token: "",
  expiresAt: 0,
  subscriptions: {
    status: AsyncStatus.IDLE,
    error: "",
    subscriptionIds: {},
  },
  playlists: {
    status: AsyncStatus.IDLE,
    error: "",
  },
};

export const fetchSubscriptions = createAsyncThunk(
  "user/fetchSubscriptions",
  async (options?: Record<string, string>) => {
    const response = await fetchSubscriptionsAPI(options);
    return response;
  }
);

export const fetchPlayLists = createAsyncThunk(
  "user/fetchPlayLists",
  async (options?: Record<string, string>) => {
    const response = await fetchPlayListsAPI(options);
    return response;
  }
);

export const fetchSubscriptionId = createAsyncThunk(
  "user/fetchSubscriptionId",
  async (channelId: string) => {
    const response = await fetchSubscriptionIdAPI(channelId);
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signin: (
      state,
      {
        payload: { user, token, expiresAt },
      }: PayloadAction<{ user: UserProfile; token: string; expiresAt: number }>
    ) => {
      state.profile = user;
      state.token = "Bearer " + token;
      state.expiresAt = expiresAt;
    },
    signout: (state) => {
      state.profile = null;
      state.token = "";
      state.expiresAt = 0;
      state.subscriptions = {
        status: AsyncStatus.IDLE,
        error: "",
        subscriptionIds: {},
      };
      state.playlists = {
        status: AsyncStatus.IDLE,
        error: "",
      };
    },
    receiveSubscriptionId: (
      state,
      {
        payload: { channelId, subscriptionId },
      }: PayloadAction<{ channelId: string; subscriptionId: string }>
    ) => {
      state.subscriptions.subscriptionIds[channelId] = subscriptionId;
    },
  },
  extraReducers: (builder) => {
    const fetchSubscriptionsStart = (
      state: UserState,
      { meta: { arg } }: { meta: { arg?: Record<string, string> } }
    ) => {
      state.subscriptions.status = AsyncStatus.LOADING;
      if (!arg?.pageToken) state.subscriptions.data = undefined;
    };
    const fetchSubscriptionsSuccess = (
      state: UserState,
      {
        payload,
      }: {
        payload: AxiosResponse<SubscriptionsResponse>;
      }
    ) => {
      const currentItems = state.subscriptions.data?.items || [];
      state.subscriptions.status = AsyncStatus.SUCCESS;
      state.subscriptions.error = "";
      state.subscriptions.data = {
        ...payload.data,
        items: [...currentItems, ...payload.data.items],
      };
    };
    const fetchSubscriptionsFailed = (
      state: UserState,
      { error }: { error: SerializedError }
    ) => {
      state.subscriptions.status = AsyncStatus.FAIL;
      state.subscriptions.error = error.message || DEFAULT_ERROR_MESSAGE;
    };

    const fetchPlayListsStart = (
      state: UserState,
      { meta: { arg } }: { meta: { arg?: Record<string, string> } }
    ) => {
      state.playlists.status = AsyncStatus.LOADING;
      if (!arg?.pageToken) state.playlists.data = undefined;
    };
    const fetchPlayListsSuccess = (
      state: UserState,
      {
        payload,
      }: {
        payload: AxiosResponse<PlayListsResponse>;
      }
    ) => {
      const currentItems = state.playlists.data?.items || [];
      state.playlists.status = AsyncStatus.SUCCESS;
      state.playlists.error = "";
      state.playlists.data = {
        ...payload.data,
        items: [...currentItems, ...payload.data.items],
      };
    };
    const fetchPlayListsFailed = (
      state: UserState,
      { error }: { error: SerializedError }
    ) => {
      state.playlists.status = AsyncStatus.FAIL;
      state.playlists.error = error.message || DEFAULT_ERROR_MESSAGE;
    };

    builder
      .addCase(fetchSubscriptions.pending, fetchSubscriptionsStart)
      .addCase(fetchSubscriptions.fulfilled, fetchSubscriptionsSuccess)
      .addCase(fetchSubscriptions.rejected, fetchSubscriptionsFailed)
      .addCase(fetchPlayLists.pending, fetchPlayListsStart)
      .addCase(fetchPlayLists.fulfilled, fetchPlayListsSuccess)
      .addCase(fetchPlayLists.rejected, fetchPlayListsFailed);
  },
});

export const { signin, signout, receiveSubscriptionId } = userSlice.actions;

const selUserState = (state: RootState) => state.user;

export const selIsSignedIn = createSelector(selUserState, (user) => {
  const isExpired = Date.now() > user.expiresAt;
  return !!(user.profile?.id && user.token && !isExpired);
});
export const selToken = createSelector(selUserState, (user) => user.token);
export const selProfile = createSelector(selUserState, (user) => user.profile);

export const userReducer = userSlice.reducer;
