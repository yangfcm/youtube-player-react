import { errorReducer } from "reducers/error";
import { CATCH_ERROR, CLEAR_ERROR } from "actions/types";
import { error } from "__test__/fixtures/error";

describe("test error reducer", () => {
  let initState = null;
  it("errorReducer can set default state", () => {
    const state = errorReducer(initState, { type: "@@INIT" });
    expect(state).toBe(initState);
  });
  it("errorReducer can set error", () => {
    const state = errorReducer(initState, {
      type: CATCH_ERROR,
      payload: error,
    });
    expect(state).toEqual(state);
  });

  it("errorReducer can clear error", () => {
    const state = errorReducer(error, {
      type: CLEAR_ERROR,
    });
    expect(state).toBe(null);
  });
});
