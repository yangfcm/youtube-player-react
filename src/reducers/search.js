import { SEARCH } from "../actions/types";

export const searchReducer = (state = {}, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        searchResults: action.payload,
      };
    default:
      return state;
  }
};
