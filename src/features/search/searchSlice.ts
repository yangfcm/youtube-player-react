import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AsyncStatus } from "../../settings/types";
import { fetchSearchResultsAPI } from "./searchAPI";
import { SearchResultsResponse } from "./types";

export interface SearchState {
  status: AsyncStatus;
  error: SerializedError | null;
  results: SearchResultsResponse | null;
  relevantVideos: Record<string, SearchResultsResponse>;
  query: string;
}

const initialState: SearchState = {
  status: AsyncStatus.IDLE,
  error: null,
  results: null,
  relevantVideos: {},
  query: "",
};

export const fetchResults = createAsyncThunk(
  "search/fetchResults",
  async ({ q, pageToken }: Record<string, string>) => {
    const response = await fetchSearchResultsAPI({ q, pageToken });
    return response;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const fetchResultsStart = (state: SearchState) => {
      state.status = AsyncStatus.LOADING;
    };
    const fetchResultsSuccess = (
      state: SearchState,
      {
        payload,
        meta: { arg },
      }: {
        payload: AxiosResponse<SearchResultsResponse>;
        meta: { arg: Record<string, string> };
      }
    ) => {
      state.status = AsyncStatus.SUCCESS;
      state.error = null;
      const { etag, items, kind, nextPageToken, pageInfo } = payload.data;
      const currentItems = state.results?.items || [];
      if (arg.q) {
        const currentQuery = state.query;
        state.query = arg.q;
        state.results = {
          etag,
          kind,
          nextPageToken,
          pageInfo,
          items: arg.q === currentQuery ? [...currentItems, ...items] : items,
        };
      }
      if (arg.relatedToVideoId) {
        console.log("relevant videos");
      }
    };
    const fetchResultsFailed = (
      state: SearchState,
      { error }: { error: SerializedError }
    ) => {
      state.status = AsyncStatus.FAIL;
      state.error = error;
    };

    builder
      .addCase(fetchResults.pending, fetchResultsStart)
      .addCase(fetchResults.fulfilled, fetchResultsSuccess)
      .addCase(fetchResults.rejected, fetchResultsFailed);
  },
});

export const searchReducer = searchSlice.reducer;
