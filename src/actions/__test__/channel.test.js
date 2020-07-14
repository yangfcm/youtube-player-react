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
import { channelId, channelIntro } from "./fixtures/channel";
import { error } from "./fixtures/error";
import { DEFAULT_ERROR_MSG } from "../default-error-msg";

const mockStore = configMockStore([thunk]);

describe("Test channel action", () => {
  it.todo("test fetchChannel");
  it.todo("test fetchChannelSubscription");
  it.todo("test subscribe channel");
  it.todo("test unsubscribe channel");

  it("fetchChannelIntro action should get channel intro from API", async (done) => {
    const store = mockStore({});
    axios.get.mockResolvedValue({ data: channelIntro });
    await store.dispatch(fetchChannelIntro(channelId));
    expect(axios.get).toHaveBeenCalledWith("/channels", {
      params: {
        key: process.env.REACT_APP_API_KEY,
        part: "snippet,statistics",
        id: channelId,
      },
    });
    expect(store.getActions()[0]).toEqual({
      type: FETCH_CHANNEL_INTRO,
      payload: channelIntro,
    });
    done();
  });

  it("fetchChannelIntro action should handle error", async (done) => {
    const store = mockStore({});
    axios.get.mockRejectedValue(error);
    await store.dispatch(fetchChannelIntro(channelId));
    expect(store.getActions()[0]).toEqual({
      type: CATCH_ERROR,
      payload: {
        ...error.response.data.error,
        displayMessage: DEFAULT_ERROR_MSG.FAILED_TO_FETCH_CHANNEL,
      },
    });
    done();
  });
});
