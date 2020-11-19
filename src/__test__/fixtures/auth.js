const userTokenData = {
  xc: {
    token_type: "Bearer",
    access_token: "mock_access_token",
  },
};

const userInfoData = {
  id: "1234567",
  email: "test@gmail.com",
  verified_email: true,
  name: "Test Test",
  given_name: "Test",
  family_name: "Test",
  picture:
    "https://lh3.googleusercontent.com/a-/AOh14GgHZ_IO2RUfg770gLs9V6UOsJaDMsWmGKP4AUna",
  locale: "zh-CN",
};

const authedUser = {
  email: userInfoData.email,
  username: userInfoData.name,
  lastName: userInfoData.family_name,
  firstName: userInfoData.given_name,
  avatar: userInfoData.picture,
};

export { userTokenData, userInfoData, authedUser };
