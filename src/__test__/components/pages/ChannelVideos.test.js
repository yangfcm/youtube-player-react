import React from "react";
import { shallow } from "enzyme";
import { ChannelVideos } from "components/pages/ChannelVideos";
import VideoGrid from "components/modules/VideoGrid";
import Loading from "components/common/Loading";
import ErrorMessage from "components/common/ErrorMessage";
import MoreButton from "components/modules/MoreButton";
import { videosResponse, videosEmptyResponse } from "__test__/fixtures/video";
import { error } from "__test__/fixtures/error";

describe("Test ChannelVideos component", () => {
  let wrapper;
  const channelId = videosResponse.items[0].snippet.channelId;
  const mockSearchVideos = jest.fn();
  const mockClearError = jest.fn();

  afterEach(() => {
    wrapper.unmount();
  });

  describe("When component is initially rendered", () => {
    beforeEach(() => {
      wrapper = shallow(
        <ChannelVideos
          searchVideos={mockSearchVideos}
          clearError={mockClearError}
          channelId={channelId}
        />
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render Loading component", () => {
      expect(wrapper.find(Loading).exists()).toBe(true);
    });

    it("should call searchVideos", () => {
      expect(mockSearchVideos).toHaveBeenCalledWith({
        channelId,
        order: "date",
        type: "video",
      });
    });
  });

  describe("When error occurs", () => {
    beforeEach(() => {
      wrapper = shallow(
        <ChannelVideos
          channelId={channelId}
          searchVideos={mockSearchVideos}
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

  describe("When videos data is fetched", () => {
    beforeEach(() => {
      wrapper = shallow(
        <ChannelVideos
          channelId={channelId}
          searchVideos={mockSearchVideos}
          clearError={mockClearError}
          error={null}
          videos={videosResponse}
        />
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render channel title", () => {
      expect(wrapper.find("h3").text()).toContain(
        videosResponse.items[0].snippet.channelTitle
      );
    });

    it("should render VideoGrid component and pass videos to it", () => {
      expect(wrapper.find(VideoGrid).exists()).toBe(true);
      expect(wrapper.find(VideoGrid).prop("videos")).toEqual(
        videosResponse.items
      );
    });

    it("should render more button and respond to click", () => {
      const moreButton = wrapper.find(MoreButton);
      expect(moreButton.exists()).toBe(true);
      moreButton.prop("onClickMore")();
      expect(mockSearchVideos).toHaveBeenCalledWith(
        { channelId, order: "date" },
        videosResponse.nextPageToken
      );
    });
  });

  describe("When videos data fetched is empty", () => {
    beforeEach(() => {
      wrapper = shallow(
        <ChannelVideos
          channelId={channelId}
          searchVideos={mockSearchVideos}
          clearError={mockClearError}
          error={null}
          videos={videosEmptyResponse}
        />
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render ErrorMessage component", () => {
      expect(wrapper.find(ErrorMessage).exists()).toBe(true);
      expect(wrapper.find(ErrorMessage).prop("error")).toEqual({
        displayMessage: "No video in this channel",
      });
      expect(wrapper.find(VideoGrid).exists()).toBe(false);
    });
  });
});
