import { playlistReducer } from "reducers/playlist";
import { FETCH_PLAY_LIST, FETCH_PLAY_LIST_DETAIL } from "actions/types";
import {
  playlistResponse,
  playlistDetailResponse,
} from "__test__/fixtures/playlist";

describe("Test playlist reducer", () => {
  let initState = {};
  it("playlist reducer can set default state", () => {
    const state = playlistReducer(initState, { type: "@@INIT" });
    expect(state).toEqual(initState);
  });

  it("playlist reducer can set playlist", () => {
    const state = playlistReducer(initState, {
      type: FETCH_PLAY_LIST,
      payload: playlistResponse,
    });
    expect(state).toEqual({
      playlist: playlistResponse,
    });
  });

  it("playlist reducer can set playlist detail", () => {
    const state = playlistReducer(initState, {
      type: FETCH_PLAY_LIST_DETAIL,
      payload: playlistDetailResponse,
    });
    expect(state).toEqual({
      playlistDetail: playlistDetailResponse,
    });
  });
});
