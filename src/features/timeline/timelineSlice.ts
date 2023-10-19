import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { AsyncStatus } from "../../settings/types";
import { TimelineMetaData, TimelineState, TimelineVideo } from "./types";
import { DEFAULT_ERROR_MESSAGE } from "../../settings/constant";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../../settings/firebaseConfig";
import { AppDispatch } from "../../app/store";
import { signout } from "../user/userSlice";

const initialState: TimelineState = {
  videos: [],
  meta: null,
  status: AsyncStatus.IDLE,
  error: "",
};

export const fetchTimeline = createAsyncThunk(
  "timeline/fetchTimeline",
  async (userId: string) => {
    const timelineCollectionRef = collection(db, "timeline", userId, "items");
    const timelineQuery = query(
      timelineCollectionRef,
      orderBy("publishTimestamp", "desc")
    );
    const querySnapshot = await getDocs(timelineQuery);
    const timelineVideos: TimelineVideo[] = [];
    querySnapshot.forEach((doc) => {
      timelineVideos.push(doc.data() as TimelineVideo);
    });
    return timelineVideos;
  }
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
  },
  extraReducers: (builder) => {
    const fetchTimelineStart = (state: TimelineState) => {
      state.status = AsyncStatus.LOADING;
    };
    const fetchTimelineFailed = (
      state: TimelineState,
      { error }: { error: SerializedError }
    ) => {
      state.status = AsyncStatus.FAIL;
      state.error = error.message || DEFAULT_ERROR_MESSAGE;
    };
    const fetchTimelineSuccess = (
      state: TimelineState,
      { payload }: { payload: TimelineVideo[] }
    ) => {
      state.status = AsyncStatus.SUCCESS;
      state.error = "";
      state.videos = payload;
    };

    builder
      .addCase(fetchTimeline.pending, fetchTimelineStart)
      .addCase(fetchTimeline.fulfilled, fetchTimelineSuccess)
      .addCase(fetchTimeline.rejected, fetchTimelineFailed);
  },
});

export const { setTimelineMetaData, resetTimeline } = timelineSlice.actions;

export const timelineReducer = timelineSlice.reducer;
