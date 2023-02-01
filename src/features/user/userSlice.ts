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
import { SubscriptionsResponse } from "./types";
import { fetchSubscriptionsAPI } from "./userAPI";

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
  subscriptions: {
    status: AsyncStatus;
    error: string;
    data?: SubscriptionsResponse;
  };
}

const initialState: UserState = {
  profile: null,
  token: "",
  subscriptions: {
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

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signin: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user: UserProfile; token: string }>
    ) => {
      state.profile = user;
      state.token = "Bearer " + token;
    },
    signout: (state) => {
      state.profile = null;
      state.token = "";
      state.subscriptions = {
        status: AsyncStatus.IDLE,
        error: "",
      };
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
        meta: { arg },
      }: {
        payload: AxiosResponse<SubscriptionsResponse>;
        meta: { arg?: Record<string, string> };
      }
    ) => {
      const currentItems = state.subscriptions.data?.items || [];
      state.subscriptions.status = AsyncStatus.SUCCESS;
      state.subscriptions.error = "";
      state.subscriptions.data = {
        ...payload.data,
        items: arg?.pageToken
          ? [...currentItems, ...payload.data.items]
          : payload.data.items,
      };
    };
    const fetchSubscriptionsFailed = (
      state: UserState,
      { error }: { error: SerializedError }
    ) => {
      state.subscriptions.status = AsyncStatus.FAIL;
      state.subscriptions.error = error.message || "";
    };

    builder
      .addCase(fetchSubscriptions.pending, fetchSubscriptionsStart)
      .addCase(fetchSubscriptions.fulfilled, fetchSubscriptionsSuccess)
      .addCase(fetchSubscriptions.rejected, fetchSubscriptionsFailed);
  },
});

export const { signin, signout } = userSlice.actions;

const selUserState = (state: RootState) => state.user;

export const selIsSignedIn = createSelector(
  selUserState,
  (user) => !!(user.profile?.id && user.token)
);
export const selToken = createSelector(selUserState, (user) => user.token);
export const selProfile = createSelector(selUserState, (user) => user.profile);

export const userReducer = userSlice.reducer;
