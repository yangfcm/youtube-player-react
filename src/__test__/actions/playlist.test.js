import configMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { defAxios as axios, maxResults } from "settings";
import {
  FETCH_PLAY_LIST,
  FETCH_PLAY_LIST_DETAIL,
  CATCH_ERROR,
} from "actions/types";
import { fetchPlaylist, fetchPlaylistDetail } from "actions/playlist";
import { DEFAULT_ERROR_MSG } from "actions/default-error-msg";
import {
  channelId,
  playlistId,
  myPlaylistResponse,
  playlistResponse,
  playlistDetailResponse,
  playlistErrorResponse,
} from "__test__/fixtures/playlist";

const mockStore = configMockStore([thunk]);

describe("Test playlist action", () => {
  let store;
  beforeEach(() => {
    store = mockStore();
  });

  it("fetchPlaylist action can fetch playlists for a channel", async (done) => {
    axios.get.mockResolvedValue({
      data: playlistResponse,
    });
    await store.dispatch(fetchPlaylist(null, channelId, null));
    expect(axios.get).toHaveBeenCalledWith("/playlists", {
      params: {
        ...axios.defaults.params,
        part: "snippet,contentDetails,status",
        maxResults,
        channelId,
        pageToken: null,
      },
    });
    expect(store.getActions()[0]).toEqual({
      type: FETCH_PLAY_LIST,
      payload: playlistResponse,
    });
    done();
  });

  it("fetchPlaylist action can fetch playlists for an authed user ", async (done) => {
    axios.get.mockResolvedValue({
      data: myPlaylistResponse,
    });
    const accessToken = "mock_access_token";
    await store.dispatch(fetchPlaylist(null, null, accessToken));
    expect(axios.get).toHaveBeenCalledWith("/playlists", {
      headers: {
        Authorization: accessToken,
      },
      params: {
        part: "snippet,contentDetails,status",
        maxResults,
        pageToken: null,
        mine: true,
      },
    });
    expect(store.getActions()[0]).toEqual({
      type: FETCH_PLAY_LIST,
      payload: myPlaylistResponse,
    });
    done();
  });

  it("fetchPlaylist action can handle error", async (done) => {
    axios.get.mockRejectedValue(playlistErrorResponse);
    await store.dispatch(fetchPlaylist(null, channelId));
    expect(store.getActions()[0]).toEqual({
      type: CATCH_ERROR,
      payload: {
        ...playlistErrorResponse.response.data.error,
        displayMessage: DEFAULT_ERROR_MSG.FAILED_TO_FETCH_PLAYLIST,
      },
    });
    done();
  });

  it("fetchPlaylistDetail action can fetch details of a playlist", async (done) => {
    axios.get.mockResolvedValue({ data: playlistDetailResponse });
    await store.dispatch(fetchPlaylistDetail(playlistId, null));
    expect(axios.get).toHaveBeenCalledWith("/playlistItems", {
      params: {
        ...axios.defaults.params,
        part: "snippet,contentDetails,status",
        maxResults: 50,
        playlistId,
        pageToken: null,
      },
    });
    expect(store.getActions()[0]).toEqual({
      type: FETCH_PLAY_LIST_DETAIL,
      payload: playlistDetailResponse,
    });
    done();
  });

  it("fetchPlaylistDetail action can handle error", async (done) => {
    axios.get.mockRejectedValue(playlistErrorResponse);
    await store.dispatch(fetchPlaylistDetail(playlistId, null));
    expect(store.getActions()[0]).toEqual({
      type: CATCH_ERROR,
      payload: {
        ...playlistErrorResponse.response.data.error,
        displayMessage: DEFAULT_ERROR_MSG.FAILED_TO_FETCH_PLAYLIST_DETAIL,
      },
    });
    done();
  });
});
