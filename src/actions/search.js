import { defAxios as axios } from "../settings";
import { SEARCH, CATCH_ERROR } from "./types";
import { DEFAULT_ERROR_MSG } from "./default-error-msg";

/**
 * Search resources (including videos, channels, play lists)
 */
export const searchVideos = (filter, pageToken) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/search", {
        params: {
          ...filter,
          part: "snippet",
          maxResults: 15,
          pageToken,
        },
      });
      dispatch({
        type: SEARCH,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: e.response
          ? e.response.data
          : DEFAULT_ERROR_MSG.FAILED_TO_FETCH_VIDEO,
      });
    }
  };
};
