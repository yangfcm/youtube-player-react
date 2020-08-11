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
  channelIntroData,
  myChannelsData,
  channelSubscriptionData,
  channelUnsubscriptionData,
  channelSubscribeSuccessResponse,
} from "__test__/fixtures/channel";
import { error } from "__test__/fixtures/error";

const mockStore = configMockStore([thunk]);

describe("Test channel action", () => {
  let store, accessToken;

  beforeEach(() => {
    store = mockStore();
    accessToken = "test_user_access_token";
  });

  it("FetchChannel action should get channels subscribed by authorized user", async (done) => {
    const pageToken = null;
    axios.get.mockResolvedValue({
      data: myChannelsData,
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
      payload: myChannelsData,
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
    const channelId =
      channelSubscriptionData.items[0].snippet.resourceId.channelId;
    axios.get.mockResolvedValue({ data: channelSubscriptionData });
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
    const channelId = "any-channel-id";
    axios.get.mockResolvedValue({
      data: channelUnsubscriptionData,
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
    const channelId =
      channelSubscribeSuccessResponse.snippet.resourceId.channelId;
    const requestData = {
      snippet: {
        resourceId: {
          kind: "youtube#channel",
          channelId,
        },
      },
    };
    axios.post.mockResolvedValue({ data: channelSubscribeSuccessResponse });
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
      payload: channelSubscribeSuccessResponse,
    });
    done();
  });

  it("unsubscribeChannel action can return data and dispatch action", async (done) => {
    const channelId =
      channelSubscriptionData.items[0].snippet.resourceId.channelId;
    const requestData = {
      snippet: {
        resourceId: {
          kind: "youtube#channel",
          channelId,
        },
      },
    };
    const subscriptionId = channelSubscriptionData.items[0].id;
    axios.get.mockResolvedValue({
      data: channelSubscriptionData,
    });
    axios.delete.mockResolvedValue();
    await store.dispatch(unsubscribeChannel(channelId, accessToken));
    expect(axios.get).toHaveBeenCalledWith("/subscriptions", {
      headers: {
        Authorization: accessToken,
      },
      params: {
        part: "snippet",
        forChannelId: channelId,
        mine: true,
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
    const channelId = channelIntroData.items[0].id;
    axios.get.mockResolvedValue({ data: channelIntroData });
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
      payload: channelIntroData,
    });
    done();
  });

  it("fetchChannelIntro action should handle error", async (done) => {
    const channelId = channelIntroData.items[0].id;
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
