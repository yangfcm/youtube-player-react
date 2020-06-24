import { FETCH_VIDEOS, SEARCH_VIDEOS, FETCH_VIDEO } from "../actions/types";

export const videosReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_VIDEOS:
      return { ...state, videos: action.payload };
    case FETCH_VIDEO:
      return { ...state, videos: action.payload };
    default:
      return state;
  }
};
