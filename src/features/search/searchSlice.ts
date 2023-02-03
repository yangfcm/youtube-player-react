import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AsyncStatus } from "../../settings/types";
import { fetchSearchResultsAPI } from "./searchAPI";
import { SearchResultsResponse } from "./types";
import { DEFAULT_ERROR_MESSAGE } from "../../settings/constant";

export interface SearchState {
  status: AsyncStatus;
  error?: string;
  results: SearchResultsResponse | null;
  relevantVideos: Record<string, SearchResultsResponse>;
  query: string;
}

const initialState: SearchState = {
  status: AsyncStatus.IDLE,
  error: "",
  results: null,
  relevantVideos: {},
  query: "",
};

export const fetchResults = createAsyncThunk(
  "search/fetchResults",
  async (options: Record<string, string>) => {
    const response = await fetchSearchResultsAPI(options);
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
      state.error = "";
      const currentItems = state.results?.items || [];
      if (arg.q) {
        const currentQuery = state.query;
        state.query = arg.q;
        state.results = {
          ...payload.data,
          items:
            arg.q === currentQuery
              ? [...currentItems, ...payload.data.items]
              : payload.data.items,
        };
      }
      if (arg.relatedToVideoId) {
        state.relevantVideos[arg.relatedToVideoId] = payload.data;
      }
    };
    const fetchResultsFailed = (
      state: SearchState,
      { error }: { error: SerializedError }
    ) => {
      state.status = AsyncStatus.FAIL;
      state.error = error.message || DEFAULT_ERROR_MESSAGE;
    };

    builder
      .addCase(fetchResults.pending, fetchResultsStart)
      .addCase(fetchResults.fulfilled, fetchResultsSuccess)
      .addCase(fetchResults.rejected, fetchResultsFailed);
  },
});

export const searchReducer = searchSlice.reducer;
