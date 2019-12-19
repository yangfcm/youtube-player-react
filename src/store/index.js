import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  channelReducer,
  playlistReducer,
  playlistDetailReducer,
  videoReducer,
  videosReducer,
  commentsReducer,
  errorReducer
} from "../reducers/app";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configStore = () => {
  const store = createStore(
    combineReducers({
      channel: channelReducer,
      error: errorReducer,
      playlist: playlistReducer,
      playlistDetail: playlistDetailReducer,
      video: videoReducer,
      videos: videosReducer,
      comments: commentsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};

const store = configStore();
export default store;
