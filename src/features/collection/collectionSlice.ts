import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { AsyncStatus } from "../../settings/types";
import { DEFAULT_ERROR_MESSAGE } from "../../settings/constant";
import {
  createCollectionAPI,
  deleteUserCollectionAPI,
  fetchUserCollectionsAPI,
  updateCollectionItemAPI,
  updateUserCollectionAPI,
} from "./collectionAPI";
import {
  Collection,
  CollectionItem,
  CollectionItemOperation,
  CollectionState,
} from "./types";

function getCollectionData(state: CollectionState, id: string) {
  return (
    state.collectionsData[id] ?? {
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
  collectionsData: {},
};

export const createCollection = createAsyncThunk(
  "collection/createCollection",
  async (args: { userId: string; name: string; item: CollectionItem }) => {
    const { userId, name, item } = args;
    return await createCollectionAPI(userId, name, item);
  },
);

export const fetchUserCollections = createAsyncThunk(
  "collection/fetchUserCollections",
  async (userId: string) => await fetchUserCollectionsAPI(userId),
);

export const updateCollection = createAsyncThunk(
  "collection/updateCollection",
  async (args: { collectionId: string; name: string }) => {
    const { collectionId, name } = args;
    return await updateUserCollectionAPI(collectionId, { name });
  },
);

export const updateCollectionItem = createAsyncThunk(
  "collection/updateCollectionItem",
  async (args: {
    collectionId: string;
    item: CollectionItem;
    operation: CollectionItemOperation;
  }) => {
    const { collectionId, item, operation } = args;
    return await updateCollectionItemAPI(collectionId, item, operation);
  },
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
    resetCollectionMutateStatus: (state, action: PayloadAction<string>) => {
      const collectionId = action.payload;
      state.collectionsData[collectionId] = {
        ...getCollectionData(state, collectionId),
        mutateStatus: AsyncStatus.IDLE,
        mutateError: "",
      };
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
        updateCollection.pending,
        (
          state,
          { meta: { arg } }: { meta: { arg: { collectionId: string } } },
        ) => {
          const { collectionId } = arg;
          state.collectionsData[collectionId] = {
            ...getCollectionData(state, collectionId),
            mutateStatus: AsyncStatus.LOADING,
            mutateError: "",
          };
        },
      )
      .addCase(
        updateCollection.fulfilled,
        (state, { payload }: { payload: Collection }) => {
          state.collectionsData[payload.id] = {
            ...getCollectionData(state, payload.id),
            mutateStatus: AsyncStatus.SUCCESS,
            mutateError: "",
          };
          state.collections = state.collections.map((c) =>
            c.id === payload.id
              ? { ...c, name: payload.name, updatedAt: payload.updatedAt }
              : c,
          );
        },
      )
      .addCase(
        updateCollection.rejected,
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
          state.collectionsData[collectionId] = {
            ...getCollectionData(state, collectionId),
            mutateStatus: AsyncStatus.FAIL,
            mutateError: error.message || DEFAULT_ERROR_MESSAGE,
          };
        },
      )
      .addCase(
        updateCollectionItem.pending,
        (
          state,
          { meta: { arg } }: { meta: { arg: { collectionId: string } } },
        ) => {
          const { collectionId } = arg;
          state.collectionsData[collectionId] = {
            ...getCollectionData(state, collectionId),
            mutateStatus: AsyncStatus.LOADING,
            mutateError: "",
          };
        },
      )
      .addCase(
        updateCollectionItem.fulfilled,
        (state, { payload }: { payload: Collection }) => {
          state.collectionsData[payload.id] = {
            ...getCollectionData(state, payload.id),
            mutateStatus: AsyncStatus.SUCCESS,
            mutateError: "",
          };
          state.collections = state.collections.map((c) =>
            c.id === payload.id ? payload : c,
          );
        },
      )
      .addCase(
        updateCollectionItem.rejected,
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
          state.collectionsData[collectionId] = {
            ...getCollectionData(state, collectionId),
            mutateStatus: AsyncStatus.FAIL,
            mutateError: error.message || DEFAULT_ERROR_MESSAGE,
          };
        },
      )
      .addCase(
        deleteCollection.pending,
        (
          state,
          { meta: { arg } }: { meta: { arg: { collectionId: string } } },
        ) => {
          const { collectionId } = arg;
          state.collectionsData[collectionId] = {
            ...getCollectionData(state, collectionId),
            mutateStatus: AsyncStatus.LOADING,
            mutateError: "",
          };
        },
      )
      .addCase(
        deleteCollection.fulfilled,
        (state, { payload }: { payload: string }) => {
          state.collectionsData[payload] = {
            ...getCollectionData(state, payload),
            mutateStatus: AsyncStatus.SUCCESS,
            mutateError: "",
          };
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
          state.collectionsData[collectionId] = {
            ...getCollectionData(state, collectionId),
            mutateStatus: AsyncStatus.FAIL,
            mutateError: error.message || DEFAULT_ERROR_MESSAGE,
          };
        },
      );
  },
});

export const {
  resetCollections,
  resetCreateStatus,
  resetCollectionMutateStatus,
} = collectionSlice.actions;

export const collectionReducer = collectionSlice.reducer;
