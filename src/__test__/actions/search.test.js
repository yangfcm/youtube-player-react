import configMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { defAxios as axios, maxResults } from "settings";
import { SEARCH, CATCH_ERROR } from "actions/types";
import { searchVideos } from "actions/search";
import { DEFAULT_ERROR_MSG } from "actions/default-error-msg";
import {
  keyword,
  searchResultResponse,
  searchErrorResponse,
} from "__test__/fixtures/search";

const mockStore = configMockStore([thunk]);

describe("Test search action", () => {
  let store;
  const filter = { q: keyword };
  const pageToken = null;
  beforeEach(() => {
    store = mockStore();
  });

  it("search action can return search result", async (done) => {
    axios.get.mockResolvedValue({
      data: searchResultResponse,
    });
    await store.dispatch(searchVideos(filter, pageToken));
    expect(axios.get).toHaveBeenCalledWith("/search", {
      params: {
        ...axios.defaults.params,
        ...filter,
        part: "snippet",
        maxResults: 15,
        pageToken,
      },
    });
    expect(store.getActions()[0]).toEqual({
      type: SEARCH,
      payload: searchResultResponse,
    });
    done();
  });

  it("search action can handle error", async (done) => {
    axios.get.mockRejectedValue(searchErrorResponse);
    await store.dispatch(searchVideos(filter, pageToken));
    expect(store.getActions()[0]).toEqual({
      type: CATCH_ERROR,
      payload: {
        ...searchErrorResponse.response.data.error,
        displayMessage: DEFAULT_ERROR_MSG.FAILED_TO_SERCH,
      },
    });
    done();
  });
});
