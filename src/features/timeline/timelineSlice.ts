import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { AsyncStatus } from "../../settings/types";
import { TimelineMetaData, TimelineState, TimelineVideo } from "./types";
import { DEFAULT_ERROR_MESSAGE, MAX_RESULTS_24 } from "../../settings/constant";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  limit,
  startAfter,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../settings/firebaseConfig";

const initialState: TimelineState = {
  videos: [],
  meta: null,
  status: AsyncStatus.IDLE,
  error: "",
  archiveStatus: AsyncStatus.IDLE,
  archiveError: "",
};

type FetchTimelineFilter = {
  userId: string;
  maxResults?: number;
  after?: string;
  way?: "REPLACE" | "APPEND" | "TOP";
  includeArchived?: boolean;
};
export const fetchTimeline = createAsyncThunk(
  "timeline/fetchTimeline",
  async (filter: FetchTimelineFilter) => {
    const { userId, maxResults = MAX_RESULTS_24, after, includeArchived } =
      filter;
    const timelineCollectionRef = collection(db, "timeline", userId, "items");

    let startAfterDoc;
    if (after) {
      startAfterDoc = await getDoc(doc(timelineCollectionRef, after));
    }
    const timelineQuery = query(
      timelineCollectionRef,
      ...(includeArchived ? [] : [where("isActive", "==", true)]),
      orderBy("publishTimestamp", "desc"),
      startAfter(startAfterDoc || ""),
      limit(Number(maxResults)),
    );
    const querySnapshot = await getDocs(timelineQuery);
    const timelineVideos: TimelineVideo[] = [];
    querySnapshot.forEach((doc) => {
      timelineVideos.push(doc.data() as TimelineVideo);
    });
    return timelineVideos;
  },
);

export const archiveTimelineVideo = createAsyncThunk(
  "timeline/archiveTimelineVideo",
  async (args: { userId: string; videoId: string }) => {
    const { userId, videoId } = args;
    const itemRef = doc(db, "timeline", userId, "items", videoId);
    await updateDoc(itemRef, { isActive: false });
    return videoId;
  },
);

const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    setTimeline: (state, action: PayloadAction<TimelineVideo[]>) => {
      state.videos = action.payload;
      state.error = "";
      state.status = AsyncStatus.SUCCESS;
    },
    setTimelineMetaData: (state, action: PayloadAction<TimelineMetaData>) => {
      state.meta = action.payload;
    },
    resetTimeline: (state) => {
      state.videos = [];
      state.error = "";
      state.status = AsyncStatus.IDLE;
      state.meta = null;
    },
    resetArchiveStatus: (state) => {
      state.archiveStatus = AsyncStatus.IDLE;
      state.archiveError = "";
    },
  },
  extraReducers: (builder) => {
    const fetchTimelineStart = (state: TimelineState) => {
      state.status = AsyncStatus.LOADING;
    };
    const fetchTimelineFailed = (
      state: TimelineState,
      { error }: { error: SerializedError },
    ) => {
      state.status = AsyncStatus.FAIL;
      state.error = error.message || DEFAULT_ERROR_MESSAGE;
    };
    const fetchTimelineSuccess = (
      state: TimelineState,
      {
        payload,
        meta: { arg },
      }: { payload: TimelineVideo[]; meta: { arg: FetchTimelineFilter } },
    ) => {
      const { way = "REPLACE" } = arg;
      state.status = AsyncStatus.SUCCESS;
      state.error = "";

      const currentItems = state.videos;

      switch (way) {
        case "REPLACE":
          state.videos = payload;
          break;
        case "APPEND":
          state.videos = [...currentItems, ...payload];
          break;
        case "TOP":
          state.videos = [...payload, ...currentItems];
          break;
        default:
          return;
      }
    };

    builder
      .addCase(fetchTimeline.pending, fetchTimelineStart)
      .addCase(fetchTimeline.fulfilled, fetchTimelineSuccess)
      .addCase(fetchTimeline.rejected, fetchTimelineFailed)
      .addCase(archiveTimelineVideo.pending, (state) => {
        state.archiveStatus = AsyncStatus.LOADING;
        state.archiveError = "";
      })
      .addCase(
        archiveTimelineVideo.fulfilled,
        (state, { payload: videoId }: { payload: string }) => {
          state.archiveStatus = AsyncStatus.SUCCESS;
          const video = state.videos.find((v) => v.id === videoId);
          if (video) {
            video.isActive = false;
          }
          if (state.meta) {
            state.meta.totalCount = Math.max(0, state.meta.totalCount - 1);
          }
        },
      )
      .addCase(
        archiveTimelineVideo.rejected,
        (state, { error }: { error: SerializedError }) => {
          state.archiveStatus = AsyncStatus.FAIL;
          state.archiveError = error.message || DEFAULT_ERROR_MESSAGE;
        },
      );
  },
});

export const { setTimelineMetaData, resetTimeline, resetArchiveStatus } =
  timelineSlice.actions;

export const timelineReducer = timelineSlice.reducer;
