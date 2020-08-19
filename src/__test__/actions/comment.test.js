import configMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { defAxios as axios, maxResults } from "settings";
import {
  ADD_COMMENT,
  FETCH_COMMENTS,
  FETCH_REPLIES,
  FETCH_COMMENTS_DISABLED,
  CATCH_ERROR,
} from "actions/types";
import {
  fetchComments,
  addComment,
  fetchCommentReplies,
} from "actions/comment";
import { DEFAULT_ERROR_MSG } from "actions/default-error-msg";
import {
  videoId,
  commentId,
  channelId,
  commentErrorResponse,
  commentDisabledErrorResponse,
  addedCommentResponse,
  commentsResponse,
  repliesResponse,
} from "__test__/fixtures/comment";

const mockStore = configMockStore([thunk]);

describe("Test comment action", () => {
  let store, accessToken;
  beforeEach(() => {
    store = mockStore();
    accessToken = "test_user_access_token";
  });

  it("fetchComments action can get comments under a video", async (done) => {
    axios.get.mockResolvedValue({
      data: commentsResponse,
    });
    await store.dispatch(fetchComments(videoId, null, accessToken));
    expect(axios.get).toHaveBeenCalledWith("/commentThreads", {
      headers: {
        Authorization: accessToken,
      },
      params: {
        ...axios.defaults.params,
        part: "snippet",
        videoId,
        maxResults,
        pageToken: null,
        order: "relevance",
      },
    });
    expect(store.getActions()[0]).toEqual({
      type: FETCH_COMMENTS,
      payload: commentsResponse,
    });
    done();
  });

  it("fetchComments action can handle error", async (done) => {
    axios.get.mockRejectedValue(commentErrorResponse);
    await store.dispatch(fetchComments(videoId, null, accessToken));
    expect(store.getActions()[0]).toEqual({
      type: CATCH_ERROR,
      payload: {
        ...commentErrorResponse.response.data.error,
        displayMessage: DEFAULT_ERROR_MSG.FAILED_TO_FETCH_COMMENTS,
      },
    });
    done();
  });

  it("fetchComments action can handle commentDisabled error", async (done) => {
    axios.get.mockRejectedValue(commentDisabledErrorResponse);
    await store.dispatch(fetchComments(videoId, null, accessToken));
    expect(store.getActions()[0]).toEqual({
      type: FETCH_COMMENTS_DISABLED,
    });
    done();
  });

  it("addComment action can handle add comment request", async (done) => {
    axios.post.mockResolvedValue({ data: addedCommentResponse });
    const commentText =
      addedCommentResponse.snippet.topLevelComment.snippet.textDisplay;
    const requestBody = {
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
    await store.dispatch(
      addComment(channelId, videoId, commentText, accessToken)
    );
    expect(axios.post).toHaveBeenCalledWith("/commentThreads", requestBody, {
      headers: {
        Authorization: accessToken,
      },
      params: {
        ...axios.defaults.params,
        part: "snippet",
      },
    });
    expect(store.getActions()[0]).toEqual({
      type: ADD_COMMENT,
      payload: addedCommentResponse,
    });
    done();
  });

  it("addComment action can handle error", async (done) => {
    axios.post.mockRejectedValue(commentErrorResponse);
    await store.dispatch(addComment(channelId, videoId, "", accessToken));
    expect(store.getActions()[0]).toEqual({
      type: CATCH_ERROR,
      payload: {
        ...commentErrorResponse.response.data.error,
        displayMessage: DEFAULT_ERROR_MSG.FAILED_TO_ADD_COMMENT,
      },
    });
    done();
  });

  it("fetchCommentReplies action can get replies under a comment", async (done) => {
    axios.get.mockResolvedValue({ data: repliesResponse });
    await store.dispatch(fetchCommentReplies(commentId, null));
    expect(axios.get).toHaveBeenCalledWith("/comments", {
      params: {
        ...axios.defaults.params,
        part: "snippet",
        parentId: commentId,
        maxResults,
        pageToken: null,
      },
    });
    expect(store.getActions()[0]).toEqual({
      type: FETCH_REPLIES,
      payload: repliesResponse,
    });
    done();
  });

  it("fetchCommentReplies action can handle error", async (done) => {
    axios.get.mockRejectedValue(commentErrorResponse);
    await store.dispatch(fetchCommentReplies(commentId, null));
    expect(store.getActions()[0]).toEqual({
      type: CATCH_ERROR,
      payload: {
        ...commentErrorResponse.response.data.error,
        displayMessage: DEFAULT_ERROR_MSG.FAILED_TO_FETCH_REPLIES,
      },
    });
    done();
  });
});
