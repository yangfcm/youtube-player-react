import { SIGN_IN, SIGN_OUT, CATCH_ERROR } from "./types";
import axios from "axios";

export const signIn = (user) => {
  return async (dispatch) => {
    try {
      if (!user) {
        throw Error("Authorization failed");
      }
      const accessToken = `${user.getAuthResponse().token_type} ${
        user.getAuthResponse().access_token
      }`;
      localStorage.setItem("access_token", accessToken);
      const response = await axios.get(
        "https://www.googleapis.com/oauth2/v1/userinfo?alt=json",
        {
          headers: {
            Authorization: accessToken,
          },
        }
      );
      dispatch({
        type: SIGN_IN,
        payload: {
          email: response.data.email,
          username: response.data.name,
          lastName: response.data.family_name,
          firstName: response.data.given_name,
          avatar: response.data.picture,
        },
      });
    } catch (e) {
      dispatch({
        type: CATCH_ERROR,
        payload: "Authorization failed",
      });
    }
  };
};

export const signOut = () => {
  localStorage.removeItem("access_token");
  return {
    type: SIGN_OUT,
  };
};
