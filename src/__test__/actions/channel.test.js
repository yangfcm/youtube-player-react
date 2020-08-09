import configMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { defAxios as axios } from "settings";
import {
  FETCH_CHANNEL,
  FETCH_CHANNEL_SUBSCRIPTION,
  FETCH_CHANNEL_INTRO,
  SUBSCRIBE_CHANNEL,
  UNSUBSCRIBE_CHANNEL,
  CATCH_ERROR,
} from "actions/types";
import {
  fetchChannel,
  fetchChannelSubscription,
  subscribeChannel,
  unsubscribeChannel,
  fetchChannelIntro,
} from "actions/channel";
import { DEFAULT_ERROR_MSG } from "actions/default-error-msg";
import {
  channelIntro,
  subscriptions,
  channelItem1,
} from "__test__/fixtures/channel";
import { error } from "__test__/fixtures/error";

const mockStore = configMockStore([thunk]);

describe("Test channel action", () => {
  let store, accessToken;

  beforeEach(() => {
    store = mockStore();
    accessToken = "test_user_access_token";
  });

  it("FetchChannel action should get subscribed channels by authorized user", async (done) => {
    const pageToken = null;
    axios.get.mockResolvedValue({
      data: subscriptions,
    });
    await store.dispatch(fetchChannel(pageToken, accessToken));
    expect(axios.get).toHaveBeenCalledWith("/subscriptions", {
      headers: {
        Authorization: accessToken,
      },
      params: {
        ...axios.defaults.params,
        part: "snippet",
        maxResults: 50,
        pageToken,
        order: "alphabetical",
        mine: true,
      },
    });
    expect(store.getActions()[0]).toEqual({
      type: FETCH_CHANNEL,
      payload: subscriptions,
    });
    done();
  });

  it("fetchChannel action can handle error", async (done) => {
    axios.get.mockRejectedValue(error);
    await store.dispatch(fetchChannel(null, "access_token"));
    expect(store.getActions()[0]).toEqual({
      type: CATCH_ERROR,
      payload: {
        ...error.response.data.error,
        displayMessage: DEFAULT_ERROR_MSG.FAILED_TO_FETCH_CHANNEL,
      },
    });
    done();
  });

  it("fetchChannelSubscription action can fetch subscribed status and dispatch action", async (done) => {
    const channelId = channelItem1.snippet.resourceId.channelId;
    axios.get.mockResolvedValue({
      data: {
        items: [channelItem1],
      },
    });
    await store.dispatch(fetchChannelSubscription(channelId, accessToken));
    expect(axios.get).toHaveBeenCalledWith("/subscriptions", {
      headers: {
        Authorization: accessToken,
      },
      params: {
        ...axios.defaults.params,
        part: "snippet",
        forChannelId: channelId,
        mine: true,
      },
    });
    expect(store.getActions()[0]).toEqual({
      type: FETCH_CHANNEL_SUBSCRIPTION,
      payload: {
        isSubscribed: true,
      },
    });
    done();
  });

  it("fetchChannelSubscription action can fetch unsubscribed status and dispatch action", async (done) => {
    const channelId = channelItem1.snippet.resourceId.channelId;
    axios.get.mockResolvedValue({
      data: {
        items: [],
      },
    });
    await store.dispatch(fetchChannelSubscription(channelId, accessToken));
    expect(axios.get).toHaveBeenCalledWith("/subscriptions", {
      headers: {
        Authorization: accessToken,
      },
      params: {
        ...axios.defaults.params,
        part: "snippet",
        forChannelId: channelId,
        mine: true,
      },
    });
    expect(store.getActions()[0]).toEqual({
      type: FETCH_CHANNEL_SUBSCRIPTION,
      payload: {
        isSubscribed: false,
      },
    });
    done();
  });

  it("subscribeChannel action can return data and dispatch action", async (done) => {
    const channelId = channelItem1.snippet.resourceId.channelId;
    const requestData = {
      snippet: {
        resourceId: {
          kind: "youtube#channel",
          channelId,
        },
      },
    };
    axios.post.mockResolvedValue({ data: channelItem1 });
    await store.dispatch(subscribeChannel(channelId, accessToken));
    expect(axios.post).toHaveBeenCalledWith("/subscriptions", requestData, {
      headers: {
        Authorization: accessToken,
      },
      params: {
        part: "snippet",
      },
    });
    expect(store.getActions()[0]).toEqual({
      type: SUBSCRIBE_CHANNEL,
      payload: channelItem1,
    });
    done();
  });

  it("unsubscribeChannel action can return data and dispatch action", async (done) => {
    const channelId = channelItem1.snippet.resourceId.channelId;
    const requestData = {
      snippet: {
        resourceId: {
          kind: "youtube#channel",
          channelId,
        },
      },
    };
    const subscriptionId = channelItem1.id;
    axios.get.mockResolvedValue({
      data: { items: [channelItem1] },
    });
    axios.delete.mockResolvedValue();
    await store.dispatch(unsubscribeChannel(channelId, accessToken));
    expect(axios.post).toHaveBeenCalledWith("/subscriptions", requestData, {
      headers: {
        Authorization: accessToken,
      },
      params: {
        part: "snippet",
      },
    });
    expect(axios.delete).toHaveBeenCalledWith("/subscriptions", {
      headers: {
        Authorization: accessToken,
      },
      params: {
        id: subscriptionId,
      },
    });
    expect(store.getActions()[0]).toEqual({
      type: UNSUBSCRIBE_CHANNEL,
    });
    done();
  });

  it("fetchChannelIntro action should get channel intro from API", async (done) => {
    axios.get.mockResolvedValue({ data: channelIntro });
    await store.dispatch(fetchChannelIntro(fetchChannelIntro.channelId));
    expect(axios.get).toHaveBeenCalledWith("/channels", {
      params: {
        key: process.env.REACT_APP_API_KEY,
        part: "snippet,statistics",
        id: fetchChannelIntro.channelId,
      },
    });
    expect(store.getActions()[0]).toEqual({
      type: FETCH_CHANNEL_INTRO,
      payload: channelIntro,
    });
    done();
  });

  it("fetchChannelIntro action should handle error", async (done) => {
    axios.get.mockRejectedValue(error);
    await store.dispatch(fetchChannelIntro(channelIntro.channelId));
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
