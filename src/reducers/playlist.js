import { FETCH_PLAY_LIST, FETCH_PLAY_LIST_DETAIL } from "../actions/types";

export const playlistReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_PLAY_LIST:
      return {
        ...state,
        playlist: action.payload,
      };
    case FETCH_PLAY_LIST_DETAIL:
      return {
        ...state,
        playlistDetail: action.payload,
      };
    default:
      return state;
  }
};
