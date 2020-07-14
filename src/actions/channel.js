import { defAxios as axios } from "../settings";
import {
  FETCH_CHANNEL,
  FETCH_CHANNEL_SUBSCRIPTION,
  FETCH_CHANNEL_INTRO,
  SUBSCRIBE_CHANNEL,
  UNSUBSCRIBE_CHANNEL,
  CATCH_ERROR,
} from "./types";
import { DEFAULT_ERROR_MSG } from "./default-error-msg";

/** Fetch subscribed channels by the current authorized user */
export const fetchChannel = (pageToken, accessToken) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/subscriptions", {
        headers: {
          Authorization: accessToken,
        },
        params: {
          ...axios.defaults.params,
          part: "snippet",
          maxResults: 50,
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
        payload: {
          ...e.response.data.error,
          displayMessage: DEFAULT_ERROR_MSG.FAILED_TO_FETCH_CHANNEL,
        },
      });
    }
  };
};

/** Give a channel id, if it is subscribed by the authorized user,
 * return true, otherwise return false
 */
export const fetchChannelSubscription = (channelId, accessToken) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/subscriptions", {
        headers: {
          Authorization: accessToken,
        },
        params: {
          ...axios.defaults.params,
          part: "snippet",
          forChannelId: channelId,
          mine: true,
        },
      });
      if (response.data.items.length === 0) {
        // If the channel is not subscribed by the authorized user
        dispatch({
          type: FETCH_CHANNEL_SUBSCRIPTION,
          payload: {
            isSubscribed: false,
          },
        });
      } else {
        // If the channel is subscribed by the authorized user
        dispatch({
          type: FETCH_CHANNEL_SUBSCRIPTION,
          payload: {
            isSubscribed: true,
          },
        });
      }
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: {
          ...e.response.data.error,
          displayMessage:
            DEFAULT_ERROR_MSG.FAILED_TO_FETCH_CHANNEL_SUBSCRIPTION,
        },
      });
    }
  };
};

/** Fetch channel intro */
export const fetchChannelIntro = (channelId) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/channels", {
        params: {
          ...axios.defaults.params,
          part: "snippet,statistics",
          id: channelId,
        },
      });
      dispatch({
        type: FETCH_CHANNEL_INTRO,
        payload: response.data,
      });
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: {
          ...e.response.data.error,
          displayMessage: DEFAULT_ERROR_MSG.FAILED_TO_FETCH_CHANNEL,
        },
      });
    }
  };
};

/** subscribe a channel */
export const subscribeChannel = (channelId, accessToken) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        "/subscriptions",
        {
          snippet: {
            resourceId: {
              kind: "youtube#channel",
              channelId,
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
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: {
          ...e.response.data.error,
          displayMessage: DEFAULT_ERROR_MSG.FAILED_TO_SUBSCRIBE,
        },
      });
    }
  };
};

/** Unsubscribe a channel */
export const unsubscribeChannel = (channelId, accessToken) => {
  return async (dispatch) => {
    try {
      /** Use channelId to get subscription id */
      const subscriptionRes = await axios.get("/subscriptions", {
        headers: {
          Authorization: accessToken,
        },
        params: {
          part: "snippet",
          forChannelId: channelId,
          mine: true,
        },
      });
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
        payload: {
          ...e.response.data.error,
          displayMessage: DEFAULT_ERROR_MSG.FAILED_TO_UNSUBSCRIBE,
        },
      });
    }
  };
};
