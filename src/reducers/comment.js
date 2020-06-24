import {
  ADD_COMMENT,
  FETCH_COMMENTS,
  FETCH_REPLIES,
  FETCH_COMMENTS_DISABLED,
} from "../actions/types";

export const commentReducer = (state = { isDisabled: false }, action) => {
  switch (action.type) {
    case FETCH_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        isDisabled: false,
      };
    case FETCH_COMMENTS_DISABLED:
      return {
        ...state,
        isDisabled: true,
        comments: null,
      };
    case FETCH_REPLIES:
      return {
        ...state,
        replies: action.payload,
      };
    case ADD_COMMENT:
      return {
        ...state,
        addedComment: action.payload,
      };
    default:
      return state;
  }
};
