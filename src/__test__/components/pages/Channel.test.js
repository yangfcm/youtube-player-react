import React from "react";
import { shallow, ReactWrapper } from "enzyme";
import { Channel } from "components/pages/Channel";
import Banner from "components/layout/Banner";
import Menu from "components/layout/Menu";
import Loading from "components/common/Loading";
import ErrorMessage from "components/common/ErrorMessage";
import ChannelItem from "components/modules/ChannelItem";
import MoreButton from "components/modules/MoreButton";
import NoSignedIn from "components/common/NoSignIn";
import { authedUser } from "__test__/fixtures/auth";
import { myChannelsData, myChannelsEmptyData } from "__test__/fixtures/channel";
import { error } from "__test__/fixtures/error";

describe("Test Channel component", () => {
  let wrapper;
  const mockFetchChannel = jest.fn();
  const mockClearError = jest.fn();

  const mockAccessToken = "mock_access_token";
  Object.defineProperty(global, "localStorage", {
    value: {
      getItem: jest.fn(() => mockAccessToken),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("When user is not logged in", () => {
    beforeEach(() => {
      wrapper = shallow(
        <Channel
          auth={{ signedIn: false, user: null }}
          fetchChannel={mockFetchChannel}
          clearError={mockClearError}
        />
      );
    });
    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should prompt user is not signed in", () => {
      expect(wrapper.find(NoSignedIn).exists()).toBe(true);
    });

    it("should fetch channels when user sign in", () => {
      wrapper.setProps({
        auth: {
          signedIn: true,
          user: authedUser,
        },
      });
      expect(mockFetchChannel).toHaveBeenCalled();
      expect(mockFetchChannel).toHaveBeenCalledWith(null, mockAccessToken);
    });
  });

  describe("When user is signed in and component is initially rendered", () => {
    beforeEach(() => {
      wrapper = shallow(
        <Channel
          auth={{ signedIn: true, user: authedUser }}
          fetchChannel={mockFetchChannel}
          clearError={mockClearError}
        />
      );
    });
    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render Banner and Menu component", () => {
      expect(wrapper.find(Banner).exists()).toBe(true);
      expect(wrapper.find(Menu).exists()).toBe(true);
    });

    it("should render Loading component", () => {
      expect(wrapper.find(Loading).exists()).toBe(true);
    });

    it("should call fetchChannels", () => {
      expect(mockFetchChannel).toHaveBeenCalled();
      expect(mockFetchChannel).toHaveBeenCalledWith(null, mockAccessToken);
    });
  });

  describe("When error occurs when fetching channel", () => {
    beforeEach(() => {
      wrapper = shallow(
        <Channel
          auth={{ signedIn: true, user: authedUser }}
          fetchChannel={mockFetchChannel}
          clearError={mockClearError}
          error={error}
        />
      );
    });
    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render ErrorMessage component", () => {
      expect(wrapper.find(ErrorMessage).exists()).toBe(true);
    });
  });

  describe("When channels are fetched", () => {
    beforeEach(() => {
      wrapper = shallow(
        <Channel
          auth={{ signedIn: true, user: authedUser }}
          fetchChannel={mockFetchChannel}
          clearError={mockClearError}
          error={null}
          channelData={myChannelsData}
        />
      );
    });
    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render correct number of items", () => {
      expect(wrapper.find(ChannelItem)).toHaveLength(
        myChannelsData.items.length
      );
    });

    it("should render MoreButton component and respond to click", () => {
      const moreButton = wrapper.find(MoreButton);
      expect(moreButton.exists()).toBe(true);
      moreButton.prop("onClickMore")();
      expect(mockFetchChannel).toHaveBeenCalled();
      expect(mockFetchChannel).toHaveBeenCalledWith(
        myChannelsData.nextPageToken,
        mockAccessToken
      );
    });

    it("should render NoSignedIn component when user signs out", () => {
      wrapper.setProps({
        auth: { signedIn: false, user: null },
      });
      expect(wrapper.find(NoSignedIn).exists()).toBe(true);
    });
  });

  describe("When user doesn't subscribe any channel", () => {
    beforeEach(() => {
      wrapper = shallow(
        <Channel
          auth={{ signedIn: true, user: authedUser }}
          fetchChannel={mockFetchChannel}
          clearError={mockClearError}
          channelData={myChannelsEmptyData}
        />
      );
    });
    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should display correct message", () => {
      expect(wrapper.find(ErrorMessage).exists()).toBe(true);
      expect(wrapper.find(ErrorMessage).prop("error")).toEqual({
        displayMessage: "You haven't subscribed any channel",
      });
      expect(wrapper.find(ChannelItem).exists()).toBe(false);
    });
  });
});
