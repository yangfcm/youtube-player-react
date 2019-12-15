import {
  FETCH_CHANNEL,
  FETCH_PLAY_LIST,
  FETCH_RECOMMEND,
  FETCH_CHANNEL_DETAIL,
  FETCH_PLAY_LIST_DETAIL,
  FETCH_VIDEO,
  CATCH_ERROR,
  CLEAR_ERROR
} from "../actions/types";

export const playlistDetailReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_PLAY_LIST_DETAIL:
      return {
        pageInfo: action.payload.pageInfo,
        items: action.payload.items,
        nextPageToken: action.payload.nextPageToken
      };
    default:
      return state;
  }
};

export const playlistReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_PLAY_LIST:
      if (!state) {
        return {
          pageInfo: action.payload.pageInfo,
          items: action.payload.items,
          nextPageToken: action.payload.nextPageToken
        };
      } else {
        return {
          pageInfo: action.payload.pageInfo,
          items: state.items.concat(action.payload.items),
          nextPageToken: action.payload.nextPageToken
        };
      }
    default:
      return state;
  }
};

export const channelReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_CHANNEL:
      if (!state) {
        return {
          pageInfo: action.payload.pageInfo,
          items: action.payload.items,
          nextPageToken: action.payload.nextPageToken
        };
      } else {
        return {
          pageInfo: action.payload.pageInfo,
          items: state.items.concat(action.payload.items),
          nextPageToken: action.payload.nextPageToken
        };
      }
    default:
      return state;
  }
};

export const errorReducer = (state = null, action) => {
  switch (action.type) {
    case CATCH_ERROR:
      return action.payload;
    case CLEAR_ERROR:
      return null;
    default:
      return state;
  }
};
