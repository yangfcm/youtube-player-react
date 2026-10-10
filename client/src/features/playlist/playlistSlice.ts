import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { RootState } from "../../app/store";
import { AsyncStatus } from "../../settings/types";
import { fetchPlaylistVideosAPI } from "./playlistAPI";
import {
  fetchSavedPlaylistsAPI,
  removePlaylistAPI,
  savePlaylistAPI,
} from "./savedPlaylistAPI";
import { PlayListItemsResponse, PlaylistState, SavedPlaylist } from "./types";
import { DEFAULT_ERROR_MESSAGE } from "../../settings/constant";

const initialState: PlaylistState = {
  playlists: {},
  status: AsyncStatus.IDLE,
  error: "",
  savedPlaylists: [],
  savedStatus: AsyncStatus.IDLE,
  savedError: "",
  pending: {},
  errors: {},
  writeStatus: {},
};

export const fetchPlaylistVideos = createAsyncThunk(
  "playlist/fetchVideos",
  async (args: { playlistId: string; pageToken?: string }) => {
    const { playlistId, pageToken } = args;
    const response = await fetchPlaylistVideosAPI(
      playlistId,
      pageToken ? { pageToken } : {}
    );
    return response;
  }
);

export const fetchSavedPlaylists = createAsyncThunk(
  "playlist/fetchSavedPlaylists",
  async (userId: string) => await fetchSavedPlaylistsAPI(userId),
  {
    // Guards against React StrictMode's double-invoked effects re-firing this.
    condition: (_userId, { getState }) =>
      (getState() as RootState).playlist.savedStatus !== AsyncStatus.LOADING,
  }
);

export const savePlaylist = createAsyncThunk(
  "playlist/savePlaylist",
  async ({
    userId,
    playlist,
  }: {
    userId: string;
    playlist: SavedPlaylist;
  }) => {
    await savePlaylistAPI(userId, playlist);
    return playlist;
  }
);

export const removePlaylist = createAsyncThunk(
  "playlist/removePlaylist",
  async ({
    userId,
    playlistId,
  }: {
    userId: string;
    playlistId: string;
  }) => {
    await removePlaylistAPI(userId, playlistId);
    return playlistId;
  }
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {
    resetPlaylistWriteStatus: (state, { payload }: { payload: string }) => {
      state.writeStatus[payload] = AsyncStatus.IDLE;
    },
  },
  extraReducers: (builder) => {
    const fetchPlaylistVideosStart = (state: PlaylistState) => {
      state.status = AsyncStatus.LOADING;
    };
    const fetchPlaylistVideosSuccess = (
      state: PlaylistState,
      {
        payload,
        meta: { arg },
      }: {
        payload: AxiosResponse<PlayListItemsResponse>;
        meta: { arg: { playlistId: string } };
      }
    ) => {
      const { playlistId } = arg;
      if (!playlistId) return;
      const currentItems = state.playlists[playlistId]?.items || [];
      state.status = AsyncStatus.SUCCESS;
      state.error = "";
      state.playlists[playlistId] = {
        ...payload.data,
        items: [...currentItems, ...payload.data.items],
      };
    };
    const fetchPlaylistVideosFailed = (
      state: PlaylistState,
      { error }: { error: SerializedError }
    ) => {
      state.status = AsyncStatus.FAIL;
      state.error = error.message || DEFAULT_ERROR_MESSAGE;
    };

    const fetchSavedPlaylistsStart = (state: PlaylistState) => {
      state.savedStatus = AsyncStatus.LOADING;
      state.savedError = "";
    };
    const fetchSavedPlaylistsSuccess = (
      state: PlaylistState,
      { payload }: { payload: SavedPlaylist[] }
    ) => {
      state.savedStatus = AsyncStatus.SUCCESS;
      state.savedError = "";
      state.savedPlaylists = payload;
    };
    const fetchSavedPlaylistsFailed = (
      state: PlaylistState,
      { error }: { error: SerializedError }
    ) => {
      state.savedStatus = AsyncStatus.FAIL;
      state.savedError = error.message || DEFAULT_ERROR_MESSAGE;
    };

    const savePlaylistStart = (
      state: PlaylistState,
      { meta: { arg } }: { meta: { arg: { playlist: SavedPlaylist } } }
    ) => {
      state.pending[arg.playlist.id] = true;
      state.errors[arg.playlist.id] = "";
      state.writeStatus[arg.playlist.id] = AsyncStatus.LOADING;
    };
    const savePlaylistSuccess = (
      state: PlaylistState,
      { payload }: { payload: SavedPlaylist }
    ) => {
      state.pending[payload.id] = false;
      state.writeStatus[payload.id] = AsyncStatus.SUCCESS;
      if (!state.savedPlaylists.some((playlist) => playlist.id === payload.id)) {
        state.savedPlaylists.unshift(payload);
      }
    };
    const savePlaylistFailed = (
      state: PlaylistState,
      {
        meta: { arg },
        error,
      }: {
        meta: { arg: { playlist: SavedPlaylist } };
        error: SerializedError;
      }
    ) => {
      state.pending[arg.playlist.id] = false;
      state.errors[arg.playlist.id] = error.message || DEFAULT_ERROR_MESSAGE;
      state.writeStatus[arg.playlist.id] = AsyncStatus.FAIL;
    };

    const removePlaylistStart = (
      state: PlaylistState,
      { meta: { arg } }: { meta: { arg: { playlistId: string } } }
    ) => {
      state.pending[arg.playlistId] = true;
      state.errors[arg.playlistId] = "";
      state.writeStatus[arg.playlistId] = AsyncStatus.LOADING;
    };
    const removePlaylistSuccess = (
      state: PlaylistState,
      { payload }: { payload: string }
    ) => {
      state.pending[payload] = false;
      state.writeStatus[payload] = AsyncStatus.SUCCESS;
      state.savedPlaylists = state.savedPlaylists.filter(
        (playlist) => playlist.id !== payload
      );
    };
    const removePlaylistFailed = (
      state: PlaylistState,
      {
        meta: { arg },
        error,
      }: { meta: { arg: { playlistId: string } }; error: SerializedError }
    ) => {
      state.pending[arg.playlistId] = false;
      state.errors[arg.playlistId] = error.message || DEFAULT_ERROR_MESSAGE;
      state.writeStatus[arg.playlistId] = AsyncStatus.FAIL;
    };

    builder
      .addCase(fetchPlaylistVideos.pending, fetchPlaylistVideosStart)
      .addCase(fetchPlaylistVideos.fulfilled, fetchPlaylistVideosSuccess)
      .addCase(fetchPlaylistVideos.rejected, fetchPlaylistVideosFailed)
      .addCase(fetchSavedPlaylists.pending, fetchSavedPlaylistsStart)
      .addCase(fetchSavedPlaylists.fulfilled, fetchSavedPlaylistsSuccess)
      .addCase(fetchSavedPlaylists.rejected, fetchSavedPlaylistsFailed)
      .addCase(savePlaylist.pending, savePlaylistStart)
      .addCase(savePlaylist.fulfilled, savePlaylistSuccess)
      .addCase(savePlaylist.rejected, savePlaylistFailed)
      .addCase(removePlaylist.pending, removePlaylistStart)
      .addCase(removePlaylist.fulfilled, removePlaylistSuccess)
      .addCase(removePlaylist.rejected, removePlaylistFailed);
  },
});

export const { resetPlaylistWriteStatus } = playlistSlice.actions;

export const playlistReducer = playlistSlice.reducer;
