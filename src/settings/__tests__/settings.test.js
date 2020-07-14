import { apiBaseUrl, mainMenuItems, maxResults } from "../index";

const { defAxios } = jest.genMockFromModule("../index");

const expectedConfig = {
  apiBaseUrl: "https://www.googleapis.com/youtube/v3",
  timeout: 10000,
  maxResults: 12,
  mainMenuItems: [
    { link: "/", exact: true, name: "Recommend", icon: "thumbs-up" },
    {
      link: "/channel",
      exact: false,
      name: "Subscriptions",
      icon: "user-plus",
    },
    { link: "/playlist", exact: false, name: "Play List", icon: "list" },
  ],
};

describe("test settings data configured correctly", () => {
  it("apiBaseUrl should be correct", () => {
    expect(apiBaseUrl).toBe(expectedConfig.apiBaseUrl);
  });
  it("maxResults should be correct", () => {
    expect(maxResults).toBe(expectedConfig.maxResults);
  });
  it("mainMenuItems should be correct", () => {
    expect(mainMenuItems).toEqual(expectedConfig.mainMenuItems);
  });

  it("axios config should be correct", () => {
    expect(defAxios.defaults.baseURL).toBe(expectedConfig.apiBaseUrl);
    expect(defAxios.defaults.timeout).toBe(expectedConfig.timeout);
    expect(defAxios.defaults.params.key).toEqual(expect.any(String));
  });
});
