import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { AsyncStatus } from "../../settings/types";
import { UserState, UserProfile } from "./types";

const initialState: UserState = {
  profile: {
    status: AsyncStatus.IDLE,
    error: "",
  },
  isGoogleAuthEnabled: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signin: (
      state,
      { payload: { user } }: PayloadAction<{ user: UserProfile }>,
    ) => {
      state.profile.status = AsyncStatus.SUCCESS;
      state.profile.error = "";
      state.profile.data = user;
    },
    signout: (state) => {
      state.profile = {
        status: AsyncStatus.IDLE,
        error: "",
      };
    },
    setGoogleAuthEnabled: (state, { payload }: PayloadAction<boolean>) => {
      state.isGoogleAuthEnabled = payload;
    },
  },
});

export const { signin, signout, setGoogleAuthEnabled } = userSlice.actions;

const selUserState = (state: RootState) => state.user;

export const selProfile = createSelector(selUserState, (user) => user.profile);

export const userReducer = userSlice.reducer;
