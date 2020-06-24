import { defAxios as axios } from "../settings";
import { FETCH_VIDEOS, FETCH_VIDEO, CATCH_ERROR } from "./types";

/**
 * Get a set of videos based on filter,
 * e.g. videos belonging to a channel or videos belonging to a play list etc.
 */
export const fetchVideos = (filter, pageToken) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/videos", {
        params: {
          ...filter,
          part: "snippet,statistics,contentDetails",
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
        payload: e.response.data.error,
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
        payload: e.response.data.error,
      });
    }
  };
};
