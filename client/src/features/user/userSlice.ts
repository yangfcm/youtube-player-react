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
import { UserState, UserProfile, UserInfoResponse } from "./types";
import { fetchUserByTokenAPI } from "./userAPI";
import { DEFAULT_ERROR_MESSAGE } from "../../settings/constant";

const initialState: UserState = {
  profile: {
    status: AsyncStatus.IDLE,
    error: "",
  },
  token: "",
  expiresAt: 0,
  playlists: {
    status: AsyncStatus.IDLE,
    error: "",
  },
  isGoogleAuthEnabled: false,
};

export const fetchUserByToken = createAsyncThunk(
  "user/fetchUserByToken",
  async (token: string) => {
    return await fetchUserByTokenAPI(token);
  },
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signin: (
      state,
      {
        payload: { user, token, expiresAt },
      }: PayloadAction<{ user: UserProfile; token: string; expiresAt: number }>,
    ) => {
      state.profile.data = user;
      state.token = "Bearer " + token;
      state.expiresAt = expiresAt;
    },
    setToken: (
      state,
      { payload }: PayloadAction<{ token: string; expiresAt: number }>,
    ) => {
      const { token, expiresAt } = payload;
      state.token = "Bearer " + token;
      state.expiresAt = expiresAt;
    },
    signout: (state) => {
      state.profile = {
        status: AsyncStatus.IDLE,
        error: "",
      };
      state.token = "";
      state.expiresAt = 0;
      state.playlists = {
        status: AsyncStatus.IDLE,
        error: "",
      };
    },
    setGoogleAuthEnabled: (state, { payload }: PayloadAction<boolean>) => {
      state.isGoogleAuthEnabled = payload;
    },
  },
  extraReducers: (builder) => {
    const fetchUserByTokenStart = (state: UserState) => {
      state.profile.status = AsyncStatus.LOADING;
      state.profile.error = "";
    };
    const fetchUserByTokenSuccess = (
      state: UserState,
      { payload }: { payload: AxiosResponse<UserInfoResponse> },
    ) => {
      state.profile.status = AsyncStatus.SUCCESS;
      state.profile.error = "";
      const {
        data: { email, family_name, given_name, name, picture, sub },
      } = payload;
      state.profile.data = {
        id: sub,
        email,
        username: name,
        lastName: family_name,
        firstName: given_name,
        avatar: picture,
      };
    };
    const fetchUserByTokenFailed = (
      state: UserState,
      { error }: { error: SerializedError },
    ) => {
      state.profile.status = AsyncStatus.FAIL;
      state.profile.error = error.message || "Failed to login";
    };
    builder
      .addCase(fetchUserByToken.pending, fetchUserByTokenStart)
      .addCase(fetchUserByToken.fulfilled, fetchUserByTokenSuccess)
      .addCase(fetchUserByToken.rejected, fetchUserByTokenFailed);
  },
});

export const { signin, setToken, signout, setGoogleAuthEnabled } =
  userSlice.actions;

const selUserState = (state: RootState) => state.user;

export const selProfile = createSelector(selUserState, (user) => user.profile);

export const userReducer = userSlice.reducer;
