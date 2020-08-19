import configMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { defAxios as axios } from "settings";
import { FETCH_VIDEOS, FETCH_VIDEO, CATCH_ERROR } from "actions/types";
import { fetchVideos, fetchVideo } from "actions/video";
import { DEFAULT_ERROR_MSG } from "actions/default-error-msg";
import {
  videoId,
  videosResponse,
  videoResponse,
  videoErrorResponse,
} from "__test__/fixtures/video";

const mockStore = configMockStore([thunk]);

describe("Test video action", () => {
  let store;
  const filter = { chart: "mostPopular" };
  const pageToken = null;

  beforeEach(() => {
    store = mockStore();
  });

  it("fetchVideos action can return videos based on filter", async (done) => {
    axios.get.mockResolvedValue({
      data: videosResponse,
    });
    await store.dispatch(fetchVideos(filter, pageToken));
    expect(axios.get).toHaveBeenCalledWith("/videos", {
      params: {
        ...axios.defaults.params,
        ...filter,
        part: "snippet,statistics",
        maxResults: 15,
        pageToken,
      },
    });
    expect(store.getActions()[0]).toEqual({
      type: FETCH_VIDEOS,
      payload: videosResponse,
    });
    done();
  });

  it("fetchVideo action can return a video on video id", async (done) => {
    axios.get.mockResolvedValue({
      data: videoResponse,
    });
    await store.dispatch(fetchVideo(videoId));
    expect(axios.get).toHaveBeenCalledWith("/videos", {
      params: {
        ...axios.defaults.params,
        part: "snippet,statistics",
        id: videoId,
      },
    });
    expect(store.getActions()[0]).toEqual({
      type: FETCH_VIDEO,
      payload: videoResponse,
    });
    done();
  });

  it("fetchVideos action can handle errors", async (done) => {
    axios.get.mockRejectedValue(videoErrorResponse);
    await store.dispatch(fetchVideos(filter, pageToken));
    expect(store.getActions()[0]).toEqual({
      type: CATCH_ERROR,
      payload: {
        ...videoErrorResponse.response.data.error,
        displayMessage: DEFAULT_ERROR_MSG.FAILED_TO_FETCH_VIDEO,
      },
    });
    done();
  });

  it("fetchVideo action can handle errors", async (done) => {
    axios.get.mockRejectedValue(videoErrorResponse);
    await store.dispatch(fetchVideo(videoId));
    expect(store.getActions()[0]).toEqual({
      type: CATCH_ERROR,
      payload: {
        ...videoErrorResponse.response.data.error,
        displayMessage: DEFAULT_ERROR_MSG.FAILED_TO_FETCH_VIDEO,
      },
    });
    done();
  });
});
