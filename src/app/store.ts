import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import { videoReducer } from "../features/video/videoSlice";
import { settingReducer } from "../features/setting/settingSlice";
import { userReducer } from "../features/user/userSlice";
import { searchReducer } from "../features/search/searchSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    video: videoReducer,
    setting: settingReducer,
    user: userReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
