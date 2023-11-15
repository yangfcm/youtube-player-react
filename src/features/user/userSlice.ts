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
import {
  SubscriptionSnippet,
  SubscriptionsResponse,
  UserState,
  UserProfile,
  UserInfoResponse,
} from "./types";
import {
  fetchPlayListsAPI,
  fetchSubscriptionIdAPI,
  fetchSubscriptionsAPI,
  fetchUserByTokenAPI,
} from "./userAPI";
import { DEFAULT_ERROR_MESSAGE, UNSUBSCRIBED } from "../../settings/constant";

const initialState: UserState = {
  profile: {
    status: AsyncStatus.IDLE,
    error: "",
  },
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
  isGoogleAuthEnabled: false,
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

export const fetchUserByToken = createAsyncThunk(
  "user/fetchUserByToken",
  async (token: string) => {
    return await fetchUserByTokenAPI(token);
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
      state.profile.data = user;
      state.token = "Bearer " + token;
      state.expiresAt = expiresAt;
    },
    signout: (state) => {
      state.profile.data = undefined;
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
    setGoogleAuthEnabled: (state, { payload }: PayloadAction<boolean>) => {
      state.isGoogleAuthEnabled = payload;
    },
    receiveSubscriptionId: (
      state,
      {
        payload: { channelId, subscriptionId },
      }: PayloadAction<{ channelId: string; subscriptionId: string }>
    ) => {
      state.subscriptions.subscriptionIds[channelId] = subscriptionId;
    },
    subscribed: (
      state,
      {
        payload: { channelId, subscription },
      }: PayloadAction<{ channelId: string; subscription: SubscriptionSnippet }>
    ) => {
      state.subscriptions.subscriptionIds[channelId] = subscription.id;
      if (state.subscriptions.data) {
        // Add the newly subscribed channel to the top of the existing subscriptions.
        state.subscriptions.data.items.unshift(subscription);
      }
    },
    unsubscribed: (
      state,
      { payload: { channelId } }: PayloadAction<{ channelId: string }>
    ) => {
      state.subscriptions.subscriptionIds[channelId] = UNSUBSCRIBED;
      if (state.subscriptions.data) {
        state.subscriptions.data.items = state.subscriptions.data.items.filter(
          (item) => item.snippet.resourceId.channelId !== channelId
        );
      }
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
      payload.data.items.forEach(
        (item) =>
          (state.subscriptions.subscriptionIds[
            item.snippet.resourceId.channelId
          ] = item.id)
      ); // Populate subscriptionIds map.
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

    const fetchUserByTokenStart = (state: UserState) => {
      state.profile.status = AsyncStatus.LOADING;
      state.profile.error = "";
    };
    const fetchUserByTokenSuccess = (
      state: UserState,
      { payload }: { payload: AxiosResponse<UserInfoResponse> }
    ) => {
      state.profile.status = AsyncStatus.SUCCESS;
      state.profile.error = "";
      const {
        data: { email, family_name, given_name, name, picture },
      } = payload;
      state.profile.data = {
        id: "",
        email,
        username: name,
        lastName: family_name,
        firstName: given_name,
        avatar: picture,
      };
    };
    const fetchUserByTokenFailed = (
      state: UserState,
      { error }: { error: SerializedError }
    ) => {
      state.profile.status = AsyncStatus.FAIL;
      state.profile.error = error.message || "Failed to login";
    };
    builder
      .addCase(fetchSubscriptions.pending, fetchSubscriptionsStart)
      .addCase(fetchSubscriptions.fulfilled, fetchSubscriptionsSuccess)
      .addCase(fetchSubscriptions.rejected, fetchSubscriptionsFailed)
      .addCase(fetchPlayLists.pending, fetchPlayListsStart)
      .addCase(fetchPlayLists.fulfilled, fetchPlayListsSuccess)
      .addCase(fetchPlayLists.rejected, fetchPlayListsFailed)
      .addCase(fetchUserByToken.pending, fetchUserByTokenStart)
      .addCase(fetchUserByToken.fulfilled, fetchUserByTokenSuccess)
      .addCase(fetchUserByToken.rejected, fetchUserByTokenFailed);
  },
});

export const {
  signin,
  signout,
  setGoogleAuthEnabled,
  receiveSubscriptionId,
  subscribed,
  unsubscribed,
} = userSlice.actions;

const selUserState = (state: RootState) => state.user;

export const selProfile = createSelector(selUserState, (user) => user.profile);

export const userReducer = userSlice.reducer;
