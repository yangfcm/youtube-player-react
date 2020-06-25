import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// import {
//   channelReducer,
//   playlistReducer,
//   playlistDetailReducer,
//   videoReducer,
//   videosReducer,
//   commentsReducer,
//   subscriptionReducer,
//   errorReducer,
// } from "../reducers/app";
// import { videosReducer } from "../reducers/video";
import { authReducer } from "../reducers/auth";
import { channelReducer } from "../reducers/channel";
import { commentReducer } from "../reducers/comment";
import { errorReducer } from "../reducers/error";
import { playlistReducer } from "../reducers/playlist";
import { searchReducer } from "../reducers/search";
import { videoReducer } from "../reducers/video";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configStore = () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      channel: channelReducer,
      comment: commentReducer,
      error: errorReducer,
      playlist: playlistReducer,
      search: searchReducer,
      video: videoReducer,
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};

const store = configStore();
export default store;
