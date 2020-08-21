import React from "react";
// import { Provider } from "react-redux";
// import { BrowserRouter as Router, Link, withRouter } from "react-router-dom";
import { shallow } from "enzyme";
// import configMockStore from "redux-mock-store";
import { ChannelBanner } from "components/layout/ChannelBanner";
import SubscriptionButton from "components/modules/SubscriptionButton";
import {
  channelIntroData,
  channelIntroEmptyData,
} from "__test__/fixtures/channel";

describe("Test ChannelBanner component", () => {
  let wrapper;
  const fetchChannelIntro = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    // const mockStore = configMockStore();
    // store = mockStore({
    //   channel: { channelIntro: channelIntroData },
    // });
    // store.dispatch = jest.fn();
    // wrapper = mount(
    //   <Provider store={store}>
    //     <Router>
    //       <ChannelBanner />
    //     </Router>
    //   </Provider>
    // );
    wrapper = shallow(
      <ChannelBanner
        fetchChannelIntro={fetchChannelIntro}
        history={{
          push: mockPush,
        }}
        channelId={channelIntroData.items[0].id}
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should call fetchChannelIntro", () => {
    expect(fetchChannelIntro).toHaveBeenCalled();
  });

  describe("If channelIntro is fetched", () => {
    beforeEach(() => {
      wrapper.setState({
        channelIntro: channelIntroData.items[0],
      });
    });

    it("should render component ", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render correct channel image ", () => {
      const image = wrapper.find("img");
      expect(image.prop("src")).toBe(
        channelIntroData.items[0].snippet.thumbnails.medium.url
      );
      expect(image.prop("alt")).toBe(channelIntroData.items[0].snippet.title);
    });

    it("should render channel title ", () => {
      expect(wrapper.find("h3").text()).toContain(
        channelIntroData.items[0].snippet.title
      );
    });

    it("should render Subscription button and pass channel id to it", () => {
      const subscriptionButton = wrapper.find(SubscriptionButton);
      expect(subscriptionButton.exists()).toBe(true);
      expect(subscriptionButton.prop("channelId")).toBe(
        channelIntroData.items[0].id
      );
    });
  });

  describe("If channel not found", () => {
    beforeEach(() => {
      wrapper.setProps({
        channel: channelIntroEmptyData,
      });
    });

    it("should navigate to not-found page", () => {
      expect(mockPush).toHaveBeenCalled();
    });
  });
});
