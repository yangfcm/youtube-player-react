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
}

const initialState: SearchState = {
  status: AsyncStatus.IDLE,
  error: null,
  results: null,
};

export const fetchResults = createAsyncThunk(
  "search/fetchResults",
  async ({ q, pageToken }: Record<"q" | "pageToken", string>) => {
    const response = await fetchSearchResultsAPI(q, { pageToken });
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
        meta: { arg?: Record<string, string> };
      }
    ) => {
      console.log(payload, arg);
      state.status = AsyncStatus.SUCCESS;
      state.error = null;
      const { etag, items, kind, nextPageToken, pageInfo } = payload.data;
      const currentItems = state.results?.items || [];
      state.results = {
        etag,
        kind,
        nextPageToken,
        pageInfo,
        items: [...currentItems, ...items],
      };
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
