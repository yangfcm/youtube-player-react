import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

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
}

const initialState: UserState = {
  profile: null,
  token: "",
};

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
    },
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
