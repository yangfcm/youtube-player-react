import { defAxios as axios } from "../settings";
import { SEARCH, CATCH_ERROR } from "./types";

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
        payload: e.response.data.error,
      });
    }
  };
};
