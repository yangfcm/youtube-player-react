import {
  FETCH_CHANNEL,
  FETCH_PLAY_LIST,
  FETCH_VIDEOS,
  FETCH_CHANNEL_DETAIL,
  FETCH_PLAY_LIST_DETAIL,
  FETCH_VIDEO,
  FETCH_COMMENTS,
  FETCH_COMMENTS_DISABLED,
  CATCH_ERROR,
  CLEAR_ERROR
} from "../actions/types";

export const commentsReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return action.payload;
    case FETCH_COMMENTS_DISABLED:
      return action.payload;
    default:
      return state;
  }
};

export const videosReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_VIDEOS:
      return action.payload;
    default:
      return state;
  }
};

export const videoReducer = (state = null, action) => {
  switch (action.type) {
    case FETCH_VIDEO:
      return action.payload;
    default:
      return state;
  }
};

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
