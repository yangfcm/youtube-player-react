import { channelReducer } from "reducers/channel";
import {
  channelIntroData,
  myChannelsData,
  channelSubscribeSuccessResponse,
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
        payload: myChannelsData,
      }
    );
    expect(state).toEqual({
      channels: myChannelsData,
    });
  });

  it("reducer can set channel intro", () => {
    const state = channelReducer(
      {},
      {
        type: FETCH_CHANNEL_INTRO,
        payload: channelIntroData,
      }
    );
    expect(state).toEqual({
      channelIntro: channelIntroData,
    });
  });

  it("reducer can set channel subscription status as true", () => {
    const state = channelReducer(
      { channelIntro: channelIntroData },
      {
        type: FETCH_CHANNEL_SUBSCRIPTION,
        payload: { isSubscribed: true },
      }
    );
    expect(state).toEqual({
      channelIntro: channelIntroData,
      isSubscribed: true,
    });
  });

  it("reducer can set channel subscription status as false", () => {
    const state = channelReducer(
      { channelIntro: channelIntroData },
      {
        type: FETCH_CHANNEL_SUBSCRIPTION,
        payload: { isSubscribed: false },
      }
    );
    expect(state).toEqual({
      channelIntro: channelIntroData,
      isSubscribed: false,
    });
  });

  it("reducer can respond to subscribing channel", () => {
    const channelToSubscribeIntro = channelIntroData;
    const state = channelReducer(
      { channelIntro: channelToSubscribeIntro },
      {
        type: SUBSCRIBE_CHANNEL,
        payload: channelSubscribeSuccessResponse,
      }
    );
    expect(state).toEqual({
      channelIntro: channelToSubscribeIntro,
      subscribedChannel: channelSubscribeSuccessResponse,
    });
  });

  it("reducer can respond to unsubscribing channel", () => {
    const channelToUnsubscribeIntro = channelIntroData;
    const state = channelReducer(
      { channelIntro: channelToUnsubscribeIntro },
      {
        type: UNSUBSCRIBE_CHANNEL,
      }
    );
    expect(state).toEqual({
      channelIntro: channelToUnsubscribeIntro,
      subscribedChannel: null,
    });
  });
});
