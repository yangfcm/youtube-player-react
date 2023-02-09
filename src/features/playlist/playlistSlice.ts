import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AsyncStatus } from "../../settings/types";
import { fetchPlaylistVideosAPI } from "./playlistAPI";
import { PlayListItemsResponse, PlaylistState } from "./types";
import { DEFAULT_ERROR_MESSAGE } from "../../settings/constant";

const initialState: PlaylistState = {
  playlists: {},
  status: AsyncStatus.IDLE,
  error: "",
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

    builder
      .addCase(fetchPlaylistVideos.pending, fetchPlaylistVideosStart)
      .addCase(fetchPlaylistVideos.fulfilled, fetchPlaylistVideosSuccess)
      .addCase(fetchPlaylistVideos.rejected, fetchPlaylistVideosFailed);
  },
});

export const playlistReducer = playlistSlice.reducer;
