import { CLEAR_ERROR } from "./types";

/** Clear Error */
export const clearError = () => {
  return {
    type: CLEAR_ERROR,
  };
  // return (dispatch) => {
  //   dispatch({
  //     type: CLEAR_ERROR,
  //   });
  // };
};
