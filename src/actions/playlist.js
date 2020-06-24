import { defAxios as axios } from "../settings";
import { FETCH_PLAY_LIST, FETCH_PLAY_LIST_DETAIL, CATCH_ERROR } from "./types";

/** Fetch playlists under a particular channel or
 * the playlists under the channel of the authorized user
 */
export const fetchPlaylist = (pageToken, channelId, accessToken) => {
  return async (dispatch) => {
    try {
      let response;
      if (channelId) {
        response = await axios.get("/playlists", {
          params: {
            part: "snippet,contentDetails,status",
            maxResults,
            channelId,
            pageToken,
          },
        });
      }
      if (accessToken) {
        response = await axios.get("/playlists", {
          headers: {
            Authorization: accessToken,
          },
          params: {
            part: "snippet,contentDetails,status",
            maxResults,
            pageToken,
            mine: true,
          },
        });
      }
      dispatch({
        type: FETCH_PLAY_LIST,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: e.response.data,
      });
    }
  };
};

/** Fetch the videos in play list */
export const fetchPlaylistDetail = (playlistId, pageToken) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/playlistItems", {
        params: {
          part: "snippet,contentDetails,status",
          maxResults: 8,
          playlistId,
          pageToken,
        },
      });
      dispatch({
        type: FETCH_PLAY_LIST_DETAIL,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: e.response.data,
      });
    }
  };
};
