import { commentReducer } from "reducers/comment";
import {
  ADD_COMMENT,
  FETCH_COMMENTS,
  FETCH_REPLIES,
  FETCH_COMMENTS_DISABLED,
} from "actions/types";
import {
  addedCommentResponse,
  commentsResponse,
  repliesResponse,
} from "__test__/fixtures/comment";

describe("test comment reducer", () => {
  let initState = {
    isDisabled: false,
    myComments: [],
  };
  it("reducer can set default state", () => {
    const state = commentReducer(initState, { type: "@@INIT" });
    expect(state).toEqual(initState);
  });

  it("reducer can set comments", () => {
    const state = commentReducer(initState, {
      type: FETCH_COMMENTS,
      payload: commentsResponse,
    });
    expect(state).toEqual({
      comments: commentsResponse,
      isDisabled: false,
      myComments: [],
    });
  });

  it("reducer can set comments as disabled", () => {
    const state = commentReducer(initState, {
      type: FETCH_COMMENTS_DISABLED,
    });
    expect(state).toEqual({
      comments: null,
      isDisabled: true,
      myComments: [],
    });
  });

  it("reducer can set replies", () => {
    const state = commentReducer(initState, {
      type: FETCH_REPLIES,
      payload: repliesResponse,
    });
    expect(state).toEqual({
      ...state,
      replies: repliesResponse,
    });
  });

  it("reducer can add comment", () => {
    const state = commentReducer(initState, {
      type: ADD_COMMENT,
      payload: addedCommentResponse,
    });
    expect(state).toEqual({
      ...state,
      myComments: [addedCommentResponse],
    });
  });
});
