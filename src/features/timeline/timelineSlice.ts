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
  increment,
} from "firebase/firestore";
import { db } from "../../settings/firebaseConfig";

const initialState: TimelineState = {
  videos: [],
  meta: null,
  status: AsyncStatus.IDLE,
  error: "",
  hideStatus: AsyncStatus.IDLE,
  hideError: "",
};

type FetchTimelineFilter = {
  userId: string;
  maxResults?: number;
  after?: string;
  way?: "REPLACE" | "APPEND" | "TOP";
};
export const fetchTimeline = createAsyncThunk(
  "timeline/fetchTimeline",
  async (filter: FetchTimelineFilter) => {
    const { userId, maxResults = MAX_RESULTS_24, after } = filter;
    const timelineCollectionRef = collection(db, "timeline", userId, "items");

    let startAfterDoc;
    if (after) {
      startAfterDoc = await getDoc(doc(timelineCollectionRef, after));
    }
    const timelineQuery = query(
      timelineCollectionRef,
      where("isActive", "==", true),
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

export const toggleHideTimelineVideo = createAsyncThunk(
  "timeline/toggleHideTimelineVideo",
  async (args: { userId: string; videoId: string; isActive: boolean }) => {
    const { userId, videoId, isActive } = args;
    const itemRef = doc(db, "timeline", userId, "items", videoId);
    const metaRef = doc(db, "timeline", userId);
    await Promise.all([
      updateDoc(itemRef, { isActive }),
      updateDoc(metaRef, { totalCount: increment(isActive ? 1 : -1) }),
    ]);
    return { videoId, isActive };
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
    resetHideStatus: (state) => {
      state.hideStatus = AsyncStatus.IDLE;
      state.hideError = "";
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
      .addCase(toggleHideTimelineVideo.pending, (state) => {
        state.hideStatus = AsyncStatus.LOADING;
        state.hideError = "";
      })
      .addCase(
        toggleHideTimelineVideo.fulfilled,
        (
          state,
          { payload }: { payload: { videoId: string; isActive: boolean } },
        ) => {
          state.hideStatus = AsyncStatus.SUCCESS;
          const { videoId, isActive } = payload;
          const video = state.videos.find((v) => v.id === videoId);
          if (video) {
            video.isActive = isActive;
          }
        },
      )
      .addCase(
        toggleHideTimelineVideo.rejected,
        (state, { error }: { error: SerializedError }) => {
          state.hideStatus = AsyncStatus.FAIL;
          state.hideError = error.message || DEFAULT_ERROR_MESSAGE;
        },
      );
  },
});

export const { setTimelineMetaData, resetTimeline, resetHideStatus } =
  timelineSlice.actions;

export const timelineReducer = timelineSlice.reducer;
