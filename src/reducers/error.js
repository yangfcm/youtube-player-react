import { CATCH_ERROR, CLEAR_ERROR } from "../actions/types";

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
