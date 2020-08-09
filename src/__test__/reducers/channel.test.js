import { channelReducer } from "reducers/channel";
import {
  subscriptions,
  channelIntro,
  channelItem1,
} from "__test__/fixtures/channel";
import {
  FETCH_CHANNEL,
  FETCH_CHANNEL_INTRO,
  FETCH_CHANNEL_SUBSCRIPTION,
  SUBSCRIBE_CHANNEL,
  UNSUBSCRIBE_CHANNEL,
} from "actions/types";

describe("test channel reducer", () => {
  it("reducer can set default state", () => {
    const state = channelReducer({}, { type: "@@INIT" });
    expect(state).toEqual({});
  });

  it("reducer can set subscribed channels", () => {
    const state = channelReducer(
      {},
      {
        type: FETCH_CHANNEL,
        payload: subscriptions,
      }
    );
    expect(state).toEqual({
      channels: subscriptions,
    });
  });

  it("reducer can set channel intro", () => {
    const state = channelReducer(
      {},
      {
        type: FETCH_CHANNEL_INTRO,
        payload: channelIntro,
      }
    );
    expect(state).toEqual({
      channelIntro,
    });
  });

  it("reducer can set channel subscription status as true", () => {
    const state = channelReducer(
      { channelIntro },
      {
        type: FETCH_CHANNEL_SUBSCRIPTION,
        payload: { isSubscribed: true },
      }
    );
    expect(state).toEqual({
      channelIntro,
      isSubscribed: true,
    });
  });

  it("reducer can set channel subscription status as false", () => {
    const state = channelReducer(
      { channelIntro },
      {
        type: FETCH_CHANNEL_SUBSCRIPTION,
        payload: { isSubscribed: false },
      }
    );
    expect(state).toEqual({
      channelIntro,
      isSubscribed: false,
    });
  });

  it("reducer can respond to subscribing channel", () => {
    const channelToSubscribeIntro = {
      items: [channelItem1],
    };
    const state = channelReducer(
      { channelIntro: channelToSubscribeIntro, isSubscribed: false },
      {
        type: SUBSCRIBE_CHANNEL,
        payload: channelItem1,
      }
    );
    expect(state).toEqual({
      channelIntro: channelToSubscribeIntro,
      isSubscribed: false,
      subscribedChannel: channelItem1,
    });
  });

  it("reducer can respond to unsubscribing channel", () => {
    const channelToUnsubscribeIntro = {
      items: [channelItem1],
    };
    const state = channelReducer(
      { channelIntro: channelToUnsubscribeIntro, isSubscribed: true },
      {
        type: UNSUBSCRIBE_CHANNEL,
      }
    );
    expect(state).toEqual({
      channelIntro: channelToUnsubscribeIntro,
      isSubscribed: true,
      subscribedChannel: null,
    });
  });
});
