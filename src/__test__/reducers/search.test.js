import { searchReducer } from "reducers/search";
import { searchResultResponse } from "__test__/fixtures/search";
import { SEARCH } from "actions/types";

describe("Test search reducer", () => {
  let initState = {};
  it("search reducer can set default state", () => {
    const state = searchReducer(initState, { type: "@@INIT" });
    expect(state).toEqual(initState);
  });

  it("search reducer can set search result", () => {
    const state = searchReducer(initState, {
      type: SEARCH,
      payload: searchResultResponse,
    });
    expect(state).toEqual({
      searchResults: searchResultResponse,
    });
  });
});
