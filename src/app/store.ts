import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { videoReducer } from "../features/video/videoSlice";
import { settingReducer } from "../features/setting/settingSlice";
import { userReducer } from "../features/user/userSlice";
import { searchReducer } from "../features/search/searchSlice";
import { commentReducer } from "../features/comment/commentSlice";
import { playlistReducer } from "../features/playlist/playlistSlice";
import { channelReducer } from "../features/channel/channelSlice";

export const store = configureStore({
  reducer: {
    video: videoReducer,
    setting: settingReducer,
    user: userReducer,
    search: searchReducer,
    comment: commentReducer,
    playlist: playlistReducer,
    channel: channelReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV === "development",
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
