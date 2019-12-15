import { defAxios as axios } from "../settings";
import {
  FETCH_CHANNEL,
  FETCH_PLAY_LIST,
  FETCH_RECOMMEND,
  FETCH_CHANNEL_DETAIL,
  FETCH_PLAY_LIST_DETAIL,
  FETCH_VIDEO,
  CATCH_ERROR,
  CLEAR_ERROR
} from "./types";

/** Fetch playlist */
export const fetchPlaylist = (
  pageToken,
  channelId = process.env.REACT_APP_MY_CHANNEL_ID
) => {
  return async dispatch => {
    try {
      const response = await axios.get("/playlists", {
        params: {
          part: "snippet,contentDetails",
          maxResults: 15,
          channelId,
          pageToken,
          key: process.env.REACT_APP_API_KEY
        }
      });
      dispatch({
        type: FETCH_PLAY_LIST,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: "Failed to fetch playlist"
      });
    }
  };
};

/** Fetch subscribed channels */
export const fetchChannel = pageToken => {
  return async dispatch => {
    try {
      const response = await axios.get("/subscriptions", {
        params: {
          part: "snippet",
          maxResults: 15,
          channelId: process.env.REACT_APP_MY_CHANNEL_ID,
          key: process.env.REACT_APP_API_KEY,
          pageToken
        }
      });
      dispatch({
        type: FETCH_CHANNEL,
        payload: response.data
      });
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: "Failed to fetch channels"
      });
    }
  };
};

/** Clear Error */
export const clearError = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_ERROR
    });
  };
};
