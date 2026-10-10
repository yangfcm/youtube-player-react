import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { AsyncStatus } from "../../settings/types";
import { UserState, UserProfile } from "./types";
import {
  subscribeChannel,
  unsubscribeChannel,
} from "../subscription/subscriptionSlice";
import { savePlaylist, removePlaylist } from "../playlist/playlistSlice";

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
  extraReducers: (builder) => {
    builder
      .addCase(subscribeChannel.fulfilled, (state, { payload: channel }) => {
        const subscriptions = state.profile.data?.subscriptions ?? [];
        if (state.profile.data && !subscriptions.includes(channel.id)) {
          state.profile.data.subscriptions = [...subscriptions, channel.id];
        }
      })
      .addCase(unsubscribeChannel.fulfilled, (state, { payload: channelId }) => {
        if (!state.profile.data) return;
        state.profile.data.subscriptions = (
          state.profile.data.subscriptions ?? []
        ).filter((id) => id !== channelId);
      })
      .addCase(savePlaylist.fulfilled, (state, { payload: playlist }) => {
        const playlists = state.profile.data?.playlists ?? [];
        if (state.profile.data && !playlists.includes(playlist.id)) {
          state.profile.data.playlists = [...playlists, playlist.id];
        }
      })
      .addCase(removePlaylist.fulfilled, (state, { payload: playlistId }) => {
        if (!state.profile.data) return;
        state.profile.data.playlists = (
          state.profile.data.playlists ?? []
        ).filter((id) => id !== playlistId);
      });
  },
});

export const { signin, signout, setGoogleAuthEnabled } = userSlice.actions;

const selUserState = (state: RootState) => state.user;

export const selProfile = createSelector(selUserState, (user) => user.profile);

export const userReducer = userSlice.reducer;
