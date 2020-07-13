import configMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { defAxios as axios } from "../../settings";

import {
  FETCH_CHANNEL,
  FETCH_CHANNEL_SUBSCRIPTION,
  FETCH_CHANNEL_INTRO,
  SUBSCRIBE_CHANNEL,
  UNSUBSCRIBE_CHANNEL,
  CATCH_ERROR,
} from "../types";
import {
  fetchChannel,
  fetchChannelSubscription,
  fetchChannelIntro,
} from "../channel";

const mockStore = configMockStore([thunk]);
jest.mock("axios");

describe("Test channel action", () => {
  test.todo("test fetchChannel");
  test.todo("test fetchChannelSubscription");
  test.todo("test subscribe channel");
  test.todo("test unsubscribe channel");
  test("fetchChannelIntro action should get channel intro from API", async (done) => {
    const store = mockStore({});
    axios.get.mockResolvedValue({ data: "channel" });
    await store.dispatch(fetchChannelIntro("UCPIAvE0MO9pyWGNh5OoYInQ"));
    expect(store.getActions()[0]).toEqual({
      type: FETCH_CHANNEL_INTRO,
      payload: "channel",
    });
    done();
  });
});
