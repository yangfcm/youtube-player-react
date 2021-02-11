import configMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { defAxios as axios } from "settings";
import { SIGN_IN, SIGN_OUT, CATCH_ERROR } from "actions/types";
import { signIn, signOut } from "actions/auth";
import { userTokenData, userInfoData } from "../fixtures/auth";

const mockStore = configMockStore([thunk]);
describe("Test auth action", () => {
  let store;
  beforeEach(() => {
    store = mockStore();
  });

  it("signIn action should work with authorized user", async (done) => {
    axios.get.mockResolvedValue({
      data: userInfoData,
    });
    await store.dispatch(signIn(userTokenData));
    const accessToken = localStorage.getItem("access_token");
    expect(accessToken).toBe(
      `${userTokenData.uc.token_type} ${userTokenData.uc.access_token}`
    );
    expect(axios.get).toHaveBeenCalledWith(
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
      {
        headers: {
          Authorization: accessToken,
        },
      }
    );
    expect(store.getActions()[0]).toEqual({
      type: SIGN_IN,
      payload: {
        email: userInfoData.email,
        username: userInfoData.name,
        lastName: userInfoData.family_name,
        firstName: userInfoData.given_name,
        avatar: userInfoData.picture,
      },
    });
    done();
  });

  it("signIn action should handle error", async (done) => {
    await store.dispatch(signIn());
    expect(store.getActions()[0]).toEqual({
      type: CATCH_ERROR,
      payload: "Authorization failed",
    });
    done();
  });

  it("signOut action should remove access token and return object", () => {
    let accessToken;
    const mockAccessToken = "mock_access_token";
    localStorage.setItem("access_token", mockAccessToken);
    accessToken = localStorage.getItem("access_token");
    expect(accessToken).toBeTruthy();

    const action = signOut();
    accessToken = localStorage.getItem("access_token");
    expect(accessToken).toBeFalsy();
    expect(action).toEqual({
      type: SIGN_OUT,
    });
  });
});
