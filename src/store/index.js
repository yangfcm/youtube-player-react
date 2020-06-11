import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  channelReducer,
  playlistReducer,
  playlistDetailReducer,
  videoReducer,
  videosReducer,
  commentsReducer,
  errorReducer,
} from "../reducers/app";
import { authReducer } from "../reducers/auth";

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configStore = () => {
  const store = createStore(
    combineReducers({
      channel: channelReducer,
      error: errorReducer,
      playlist: playlistReducer,
      playlistDetail: playlistDetailReducer,
      video: videoReducer,
      videos: videosReducer,
      comments: commentsReducer,
      auth: authReducer,
    }),
    applyMiddleware(thunk)
  );
  return store;
};

const store = configStore();
export default store;
