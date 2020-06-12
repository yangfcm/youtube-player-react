import { SIGN_IN, SIGN_OUT } from "./types";

export const signIn = (user) => {
  // console.log("action", user);

  if (user) {
    localStorage.setItem(
      "access_token",
      `${user.wc.token_type} ${user.wc.access_token}`
    );
  }
  return {
    type: SIGN_IN,
    payload: {
      username: user.Ut.Bd,
      lastName: user.Ut.GU,
      firstName: user.Ut.GW,
      avatar: user.Ut.iL,
    },
  };
};

export const signOut = () => {
  localStorage.removeItem("access_token");
  return {
    type: SIGN_OUT,
  };
};
