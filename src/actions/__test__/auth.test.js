import { SIGN_IN, SIGN_OUT, CATCH_ERROR } from "../types";
// import { defAxios as axios } from "../../settings";
import { signIn, signOut } from "../auth";

test.todo("signIn action should work");

test("signOut action should remove access token and return object", () => {
  const action = signOut();
  const accessToken = localStorage.getItem("access_token");
  expect(accessToken).toBeFalsy();
  expect(action).toEqual({
    type: SIGN_OUT,
  });
});
