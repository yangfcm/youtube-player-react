import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

interface UserProfile {
  id: string;
  email: string;
  username: string;
  lastName: string;
  firstName: string;
  avatar: string;
}

interface UserState {
  profile: UserProfile | null;
}

const initialState: UserState = {
  profile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signin: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    signout: (state) => {
      state.profile = null;
    },
  },
});

export const { signin, signout } = userSlice.actions;

export const selIsSignedIn = (state: RootState) => !!state.user.profile?.id;

export const userReducer = userSlice.reducer;
