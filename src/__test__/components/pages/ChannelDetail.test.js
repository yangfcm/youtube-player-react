import React from "react";
import { shallow } from "enzyme";
import configMockStore from "redux-mock-store";
import ChannelDetail from "components/pages/ChannelDetail";
import { channelIntroData } from "__test__/fixtures/channel";

describe("Test ChannelDetail component", () => {
  let wrapper, store, match;
  const channelId = "channel_id";
  beforeEach(() => {
    const mockStore = configMockStore([]);
    store = mockStore({
      channel: {
        channelIntro: channelIntroData,
      },
      search: {
        searchResults: {},
      },
    });
    store.dispatch = jest.fn();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("Test component at route /channel/:id", () => {
    beforeEach(() => {
      match = {
        params: { id: channelId },
        path: "/channel/:id",
        url: `/channel/${channelId}`,
        isExact: true,
      };
      wrapper = shallow(<ChannelDetail match={match} />);
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });
  });
});
