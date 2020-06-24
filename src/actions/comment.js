import { defAxios as axios, maxResults } from "../settings";
import {
  ADD_COMMENT,
  FETCH_COMMENTS,
  FETCH_REPLIES,
  FETCH_COMMENTS_DISABLED,
  CATCH_ERROR,
} from "./types";
import { DEFAULT_ERROR_MSG } from "./default-error-msg";

/**
 * Fetch comments under a video
 * If accessToken is provided, the comments by authorized user will be displayed on the top.
 */
export const fetchComments = (
  videoId,
  pageToken,
  accessToken,
  order = "relevance"
) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/commentThreads", {
        headers: {
          Authorization: accessToken,
        },
        params: {
          part: "snippet",
          videoId,
          maxResults,
          pageToken,
          order: order === "relevance" ? "relevance" : "time",
        },
      });
      dispatch({
        type: FETCH_COMMENTS,
        payload: response.data,
      });
    } catch (e) {
      if (!e.response) {
        dispatch({
          type: CATCH_ERROR,
          payload: DEFAULT_ERROR_MSG.FAILED_TO_FETCH_COMMENTS,
        });
        return;
      }
      if (e.response.data.error.errors[0].reason === "commentsDisabled") {
        // Comment is disabled.
        dispatch({
          type: FETCH_COMMENTS_DISABLED,
          payload: DEFAULT_ERROR_MSG.COMMENT_DISABLED,
        });
      } else {
        dispatch({
          type: CATCH_ERROR,
          payload: e.response.data.error,
        });
      }
    }
  };
};

/** Add a comment to video */
export const addComment = (channelId, videoId, commentText, accessToken) => {
  return async (dispatch) => {
    try {
      const requestBdody = {
        snippet: {
          channelId,
          videoId,
          topLevelComment: {
            snippet: {
              textOriginal: commentText,
            },
          },
        },
      };
      const response = await axios.post("/commentThreads", requestBody, {
        headers: {
          Authorization: accessToken,
        },
        params: {
          part: "snippet",
        },
      });
      dispatch({
        type: ADD_COMMENT,
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

/** Fetch replies to a comment */
export const fetchCommentReplies = (commentId, pageToken) => {
  return async (dispatch) => {
    try {
      const response = await axios.get("/comments", {
        params: {
          part: "snippet",
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
        payload: e.response.data.error,
      });
    }
  };
};
