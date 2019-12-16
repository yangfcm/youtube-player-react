import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import {
  channelReducer,
  playlistReducer,
  playlistDetailReducer,
  videoReducer,
  errorReducer
} from "../reducers/app";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const cnofigStore = () => {
  const store = createStore(
    combineReducers({
      channel: channelReducer,
      error: errorReducer,
      playlist: playlistReducer,
      playlistDetail: playlistDetailReducer,
      video: videoReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};

const store = cnofigStore();
export default store;
