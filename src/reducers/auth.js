import { SIGN_IN, SIGN_OUT } from "../actions/types";

export const authReducer = (state = { signedIn: null, user: null }, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        signedIn: true,
        user: action.payload,
      };
    case SIGN_OUT:
      return {
        ...state,
        signedIn: false,
        user: null,
      };
    default:
      return state;
  }
};
