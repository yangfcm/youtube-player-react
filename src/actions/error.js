import { CLEAR_ERROR } from "./types";

/** Clear Error */
export const clearError = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };
};
