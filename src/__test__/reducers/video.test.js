import { videoReducer } from "reducers/video";
import { videoResponse, videosResponse } from "__test__/fixtures/video";
import { FETCH_VIDEOS, FETCH_VIDEO } from "actions/types";

describe("Test video reducer", () => {
  let initState = {};
  it("video reducer can set default state", () => {
    const state = videoReducer(initState, { type: "@@INIT" });
    expect(state).toEqual(initState);
  });

  it("video reducer can set videos", () => {
    const state = videoReducer(initState, {
      type: FETCH_VIDEOS,
      payload: videosResponse,
    });
    expect(state).toEqual({
      videos: videosResponse,
    });
  });

  it("video reducer can set one video", () => {
    const state = videoReducer(initState, {
      type: FETCH_VIDEO,
      payload: videoResponse,
    });
    expect(state).toEqual({
      video: videoResponse,
    });
  });
});
