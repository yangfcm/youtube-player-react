import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AsyncStatus } from "../../settings/types";
import { fetchPlaylistVideosAPI } from "./playlistAPI";
import { PlayListItemsResponse } from "./types";

interface PlaylistState {
  playlists: Record<string, PlayListItemsResponse>;
  status: AsyncStatus;
  error: string;
}

const initialState: PlaylistState = {
  playlists: {},
  status: AsyncStatus.IDLE,
  error: "",
};

export const fetchPlaylistVideos = createAsyncThunk(
  "playlist/fetchVideos",
  async (args: { playlistId: string; [key: string]: string }) => {
    const { playlistId, ...options } = args;
    const response = await fetchPlaylistVideosAPI(playlistId, options);
    return response;
  }
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState,
  reducers: {},
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
        meta: { arg: { playlistId: string; [key: string]: string } };
      }
    ) => {
      const { playlistId } = arg;
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
      state.error = error.message || "";
    };

    builder
      .addCase(fetchPlaylistVideos.pending, fetchPlaylistVideosStart)
      .addCase(fetchPlaylistVideos.fulfilled, fetchPlaylistVideosSuccess)
      .addCase(fetchPlaylistVideos.rejected, fetchPlaylistVideosFailed);
  },
});

export const playlistReducer = playlistSlice.reducer;
