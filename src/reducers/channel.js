import {
  FETCH_CHANNEL,
  FETCH_CHANNEL_SUBSCRIPTION,
  FETCH_CHANNEL_INTRO,
  SUBSCRIBE_CHANNEL,
  UNSUBSCRIBE_CHANNEL,
} from "../actions/types";

export const channelReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_CHANNEL:
      return {
        ...state,
        channels: action.payload,
      };
    case FETCH_CHANNEL_INTRO:
      return {
        ...state,
        channelIntro: action.payload,
      };
    case FETCH_CHANNEL_SUBSCRIPTION:
      return {
        ...state,
        isSubscribed: action.payload.isSubscribed,
      };
    case SUBSCRIBE_CHANNEL:
      return {
        ...state,
        subscribedChannel: action.payload,
      };
    case UNSUBSCRIBE_CHANNEL:
      return {
        ...state,
        subscribedChannel: null,
      };
    default:
      return state;
  }
};
