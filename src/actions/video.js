import { defAxios as axios } from "../settings";
import { FETCH_VIDEOS, FETCH_VIDEO, CATCH_ERROR } from "./types";
import { DEFAULT_ERROR_MSG } from "./default-error-msg";

/**
 * Get a set of videos based on filter,
 * e.g. videos belonging to a channel or videos belonging to a play list etc.
 */
export const fetchVideos = (filter, pageToken) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/videos", {
        params: {
          ...axios.defaults.params,
          ...filter,
          part: "snippet,statistics",
          maxResults: 15,
          pageToken,
        },
      });
      dispatch({
        type: FETCH_VIDEOS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: {
          ...e.response.data.error,
          displayMessage: DEFAULT_ERROR_MSG.FAILED_TO_FETCH_VIDEO,
        },
      });
    }
  };
};

/**
 * Get a video by id
 */
export const fetchVideo = (videoId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/videos", {
        params: {
          ...axios.defaults.params,
          part: "snippet,statistics",
          id: videoId,
        },
      });
      dispatch({
        type: FETCH_VIDEO,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: {
          ...e.response.data.error,
          displayMessage: DEFAULT_ERROR_MSG.FAILED_TO_FETCH_VIDEO,
        },
      });
    }
  };
};
