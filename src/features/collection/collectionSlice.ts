import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { AsyncStatus } from "../../settings/types";
import { DEFAULT_ERROR_MESSAGE } from "../../settings/constant";
import {
  createCollectionAPI,
  deleteUserCollectionAPI,
  fetchUserCollectionsAPI,
} from "./collectionAPI";
import { CollectionItem, CollectionState } from "./types";

function getCollectionData(state: CollectionState, id: string) {
  return (
    state.collectionsData.get(id) ?? {
      fetchStatus: AsyncStatus.IDLE,
      fetchError: "",
      mutateStatus: AsyncStatus.IDLE,
      mutateError: "",
    }
  );
}

const initialState: CollectionState = {
  createStatus: AsyncStatus.IDLE,
  createError: "",

  status: AsyncStatus.IDLE,
  error: "",

  collections: [],
  collectionsData: new Map(),
};

export const createCollection = createAsyncThunk(
  "collection/createCollection",
  async (
    args: { userId: string; name: string; item: CollectionItem },
    { getState },
  ) => {
    const { userId, name, item } = args;
    const { collections } = (getState() as RootState).collection;
    return await createCollectionAPI(userId, name, item, collections);
  },
);

export const fetchUserCollections = createAsyncThunk(
  "collection/fetchUserCollections",
  async (userId: string) => await fetchUserCollectionsAPI(userId),
);

export const deleteCollection = createAsyncThunk(
  "collection/deleteCollection",
  async (args: { userId: string; collectionId: string }) => {
    const { userId, collectionId } = args;
    return await deleteUserCollectionAPI(userId, collectionId);
  },
);

const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    resetCollections: () => initialState,
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
        },
      )
      .addCase(fetchUserCollections.pending, (state) => {
        state.status = AsyncStatus.LOADING;
        state.error = "";
      })
      .addCase(fetchUserCollections.fulfilled, (state, { payload }) => {
        state.status = AsyncStatus.SUCCESS;
        state.error = "";
        state.collections = payload;
      })
      .addCase(
        fetchUserCollections.rejected,
        (state, { error }: { error: SerializedError }) => {
          state.status = AsyncStatus.FAIL;
          state.error = error.message || DEFAULT_ERROR_MESSAGE;
        },
      )
      .addCase(
        deleteCollection.pending,
        (
          state,
          { meta: { arg } }: { meta: { arg: { collectionId: string } } },
        ) => {
          const { collectionId } = arg;
          state.collectionsData.set(collectionId, {
            ...getCollectionData(state, collectionId),
            mutateStatus: AsyncStatus.LOADING,
            mutateError: "",
          });
        },
      )
      .addCase(
        deleteCollection.fulfilled,
        (state, { payload }: { payload: string }) => {
          state.collectionsData.set(payload, {
            ...getCollectionData(state, payload),
            mutateStatus: AsyncStatus.SUCCESS,
            mutateError: "",
          });
          state.collections = state.collections.filter(
            (c) => c.id !== payload,
          );
        },
      )
      .addCase(
        deleteCollection.rejected,
        (
          state,
          {
            meta: { arg },
            error,
          }: {
            meta: { arg: { collectionId: string } };
            error: SerializedError;
          },
        ) => {
          const { collectionId } = arg;
          state.collectionsData.set(collectionId, {
            ...getCollectionData(state, collectionId),
            mutateStatus: AsyncStatus.FAIL,
            mutateError: error.message || DEFAULT_ERROR_MESSAGE,
          });
        },
      );
  },
});

export const { resetCollections, resetCreateStatus } = collectionSlice.actions;

export const collectionReducer = collectionSlice.reducer;
