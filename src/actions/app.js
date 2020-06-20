import { defAxios as axios, maxResults } from "../settings";
import {
  FETCH_CHANNEL,
  FETCH_CHANNEL_SUBSCRIPTION,
  FETCH_PLAY_LIST,
  FETCH_VIDEOS,
  SEARCH_VIDEOS,
  FETCH_CHANNEL_INTRO,
  FETCH_PLAY_LIST_DETAIL,
  FETCH_VIDEO,
  FETCH_COMMENTS,
  FETCH_COMMENTS_DISABLED,
  CATCH_ERROR,
  CLEAR_ERROR,
  SUBSCRIBE_CHANNEL,
  UNSUBSCRIBE_CHANNEL,
  FETCH_REPLIES,
} from "./types";

export const searchVideos = (filter, pageToken) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/search", {
        params: {
          ...filter,
          part: "snippet",
          key: process.env.REACT_APP_API_KEY,
          maxResults: 15,
          pageToken,
        },
      });
      dispatch({
        type: SEARCH_VIDEOS,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: "Failed to fetch videos list",
      });
    }
  };
};

export const fetchVideos = (filter, pageToken) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/videos", {
        params: {
          ...filter,
          part: "snippet,statistics,contentDetails",
          key: process.env.REACT_APP_API_KEY,
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
        payload: "Failed to fetch videos list",
      });
    }
  };
};

/** Fetch comments by video id */
export const fetchComments = (videoId, pageToken) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/commentThreads", {
        params: {
          part: "snippet",
          key: process.env.REACT_APP_API_KEY,
          videoId,
          maxResults,
          pageToken,
          order: "relevance",
        },
      });
      dispatch({
        type: FETCH_COMMENTS,
        payload: response.data,
      });
    } catch (e) {
      const errorReason = e.response.data.error.errors[0].reason;
      if (errorReason === "commentsDisabled") {
        // Consider comment is disabled by publisher.
        dispatch({
          type: FETCH_COMMENTS_DISABLED,
          payload: errorReason,
        });
      } else {
        dispatch({
          type: CATCH_ERROR,
          payload: "Failed to fetch comments",
        });
      }
    }
  };
};

/** Fetch replies to a comment */
export const fetchCommentReplies = (commentId, pageToken) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/comments", {
        params: {
          part: "snippet",
          key: process.env.REACT_APP_API_KEY,
          parentId: commentId,
          maxResults,
          pageToken,
        },
      });
      dispatch({
        type: FETCH_REPLIES,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: "Failed to fetch replies",
      });
    }
  };
};

/** Fetch a vidoe by id */
export const fetchVideo = (videoId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/videos", {
        params: {
          part: "snippet,statistics",
          key: process.env.REACT_APP_API_KEY,
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
        payload: "Failed to fetch video",
      });
    }
  };
};

/** Fetch playlist by ChannelId, if channel id is not provided, fetch the playlist of the log-in user*/
export const fetchPlaylist = (pageToken, channelId = "") => {
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
            key: process.env.REACT_APP_API_KEY,
          },
        });
      } else {
        const accessToken = localStorage.getItem("access_token");
        response = await axios.get("/playlists", {
          headers: {
            Authorization: accessToken,
          },
          params: {
            part: "snippet,contentDetails,status",
            maxResults,
            pageToken,
            key: process.env.REACT_APP_API_KEY,
            mine: true,
          },
        });
      }
      dispatch({
        type: FETCH_PLAY_LIST,
        payload: response.data,
      });
    } catch (e) {
      if (e.response.data.error && e.response.data.error.code === 404) {
        dispatch({
          type: CATCH_ERROR,
          payload: "No playlist in this channel",
        });
        return;
      }
      dispatch({
        type: CATCH_ERROR,
        payload: "Failed to fetch playlist",
      });
    }
  };
};

/** Fetch play list detail */
export const fetchPlaylistDetail = (playlistId, pageToken) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/playlistItems", {
        params: {
          part: "snippet,contentDetails,status",
          maxResults: 8,
          key: process.env.REACT_APP_API_KEY,
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
        payload: "Failed to fetch playlist",
      });
    }
  };
};

/** Fetch subscribed channels by the current authorized user */
export const fetchChannel = (pageToken) => {
  const accessToken = localStorage.getItem("access_token");

  return async (dispatch) => {
    try {
      const response = await axios.get("/subscriptions", {
        headers: {
          Authorization: accessToken,
        },
        params: {
          part: "snippet",
          maxResults: 50,
          // channelId: process.env.REACT_APP_MY_CHANNEL_ID,
          key: process.env.REACT_APP_API_KEY,
          pageToken,
          order: "alphabetical",
          mine: true,
        },
      });
      dispatch({
        type: FETCH_CHANNEL,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: "Failed to fetch channels",
      });
    }
  };
};

/** Given a channel id if it is subscribed by the user with access token, return the channel. Otherwise, return null */
export const fetchChannelSubscription = (channelId, accessToken) => {
  // const accessToken = localStorage.getItem("access_token");
  // if (!accessToken) {
  //   return {
  //     type: FETCH_CHANNEL_SUBSCRIPTION,
  //     payload: null,
  //   };
  // }

  return async (dispatch) => {
    try {
      const response = await axios.get("/subscriptions#list", {
        headers: {
          Authorization: accessToken,
        },
        params: {
          part: "snippet",
          forChannelId: channelId,
          key: process.env.REACT_APP_API_KEY,
          mine: true,
        },
      });
      // console.log(response.data);
      if (response.data.items.length === 0) {
        // If the channel is not subscribed by the current authorized user
        dispatch({
          type: FETCH_CHANNEL_SUBSCRIPTION,
          payload: false,
        });
      } else {
        // If the channel is not subscribed by the current authorized user

        dispatch({
          type: FETCH_CHANNEL_SUBSCRIPTION,
          payload: true,
        });
      }
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: "Failed to fetch channel's subscription",
      });
    }
  };
};

/** Fetch channel intro */
export const fetchChannelIntro = (channelId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/channels`, {
        params: {
          part: "snippet,statistics",
          id: channelId,
          key: process.env.REACT_APP_API_KEY,
        },
      });
      dispatch({
        type: FETCH_CHANNEL_INTRO,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: "Failed to fetch channel's intro",
      });
    }
  };
};

/** Subscribe a channel */
export const subscribeChannel = (channelId, accessToken) => {
  return async (dispatch) => {
    const response = await axios.post(
      "/subscriptions",
      {
        snippet: {
          resourceId: {
            kind: "youtube#channel",
            channelId: channelId,
          },
        },
      },
      {
        headers: {
          Authorization: accessToken,
        },
        params: {
          part: "snippet",
        },
      }
    );
    dispatch({
      type: SUBSCRIBE_CHANNEL,
      payload: response.data,
    });
    try {
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: "Failed to subscribe channel",
      });
    }
  };
};

export const unsubscribeChannel = (channelId, accessToken) => {
  return async (dispatch) => {
    try {
      /** Use channelId to get subscription id */
      const subscriptionRes = await axios.get("/subscriptions#list", {
        headers: {
          Authorization: accessToken,
        },
        params: {
          part: "snippet",
          forChannelId: channelId,
          key: process.env.REACT_APP_API_KEY,
          mine: true,
        },
      });

      if (subscriptionRes.data.items.length === 0) {
        throw Error("Channel not subscribed");
      }
      const subscriptionId = subscriptionRes.data.items[0].id;

      await axios.delete("/subscriptions", {
        headers: {
          Authorization: accessToken,
        },
        params: {
          id: subscriptionId,
        },
      });
      dispatch({
        type: UNSUBSCRIBE_CHANNEL,
      });
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: "Failed to unsubscribe channel",
      });
    }
  };
};

/** Clear Error */
export const clearError = () => {
  return (dispatch) => {
    dispatch({
      type: CLEAR_ERROR,
    });
  };
};
