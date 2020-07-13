import {
  apiBaseUrl,
  mainMenuItems,
  maxResults,
  defAxios as axios,
} from "../index";

const settings = jest.genMockFromModule("../index");

describe("test settings data", () => {
  it("apiBaseUrl should be correct", () => {
    expect(settings.apiBaseUrl).toBe(apiBaseUrl);
  });
  it("maxResults should be correct", () => {
    expect(settings.maxResults).toBe(maxResults);
  });
});
