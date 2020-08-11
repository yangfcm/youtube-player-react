import { authReducer } from "reducers/auth";
import { userInfoData } from "__test__/fixtures/auth";
import { SIGN_IN, SIGN_OUT } from "actions/types";

describe("Test auth reducer", () => {
  let initState = {
    signedIn: null,
    user: null,
  };
  it("reducer can set default state", () => {
    const state = authReducer(initState, { type: "@@INIT" });
    expect(state).toEqual(initState);
  });

  it("reducer can respond to user signin", () => {
    const state = authReducer(initState, {
      type: SIGN_IN,
      payload: userInfoData,
    });
    expect(state).toEqual({
      signedIn: true,
      user: userInfoData,
    });
  });

  it("reducer can response to user signout", () => {
    const state = authReducer(initState, {
      type: SIGN_OUT,
    });
    expect(state).toEqual({
      signedIn: false,
      user: null,
    });
  });
});
