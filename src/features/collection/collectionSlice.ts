import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import { AsyncStatus } from "../../settings/types";
import { DEFAULT_ERROR_MESSAGE } from "../../settings/constant";
import { createCollectionAPI } from "./collectionAPI";
import { CollectionItem } from "./types";

interface CollectionState {
  createStatus: AsyncStatus;
  createError: string;
}

const initialState: CollectionState = {
  createStatus: AsyncStatus.IDLE,
  createError: "",
};

export const createCollection = createAsyncThunk(
  "collection/createCollection",
  async (args: { userId: string; name: string; item: CollectionItem }) => {
    const { userId, name, item } = args;
    return await createCollectionAPI(userId, name, item);
  }
);

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    resetCreateStatus: (state) => {
      state.createStatus = AsyncStatus.IDLE;
      state.createError = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCollection.pending, (state) => {
        state.createStatus = AsyncStatus.LOADING;
        state.createError = "";
      })
      .addCase(createCollection.fulfilled, (state) => {
        state.createStatus = AsyncStatus.SUCCESS;
        state.createError = "";
      })
      .addCase(
        createCollection.rejected,
        (state, { error }: { error: SerializedError }) => {
          state.createStatus = AsyncStatus.FAIL;
          state.createError = error.message || DEFAULT_ERROR_MESSAGE;
        }
      );
  },
});

export const { resetCreateStatus } = collectionSlice.actions;

export const collectionReducer = collectionSlice.reducer;
