import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
      state.token = token;
    },
    signout: (state) => {
      state.profile = null;
    },
  },
});

export const { signin, signout } = userSlice.actions;

export const selIsSignedIn = (state: RootState) =>
  !!(state.user.profile?.id && state.user.token);

export const userReducer = userSlice.reducer;
