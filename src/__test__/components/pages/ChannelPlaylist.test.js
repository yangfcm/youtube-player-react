import React from "react";
import { shallow } from "enzyme";
import { ChannelPlaylist } from "components/pages/ChannelPlaylist";
import Loading from "components/common/Loading";
import ErrorMessage from "components/common/ErrorMessage";
import PlayListItem from "components/modules/PlayListItem";
import MoreButton from "components/modules/MoreButton";
import {
  playlistResponse,
  playlistErrorResponse,
  playlistEmptyResponse,
} from "__test__/fixtures/playlist";

describe("Test ChannelPlaylist component", () => {
  let wrapper;
  const channelId = playlistResponse.items[0].snippet.channelId;
  const mockFetchPlaylist = jest.fn();
  const mockClearError = jest.fn();

  afterEach(() => {
    wrapper.unmount();
  });

  describe("When component is initially rendered", () => {
    beforeEach(() => {
      wrapper = shallow(
        <ChannelPlaylist
          fetchPlaylist={mockFetchPlaylist}
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

    it("should call fetchPlaylist", () => {
      expect(mockFetchPlaylist).toHaveBeenCalledWith(null, channelId);
    });
  });

  describe("When error occurs", () => {
    beforeEach(() => {
      wrapper = shallow(
        <ChannelPlaylist
          channelId={channelId}
          fetchPlaylist={mockFetchPlaylist}
          clearError={mockClearError}
          error={playlistErrorResponse}
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

  describe("When playlist data is feteched", () => {
    beforeEach(() => {
      wrapper = shallow(
        <ChannelPlaylist
          channelId={channelId}
          fetchPlaylist={mockFetchPlaylist}
          clearError={mockClearError}
          error={null}
          playlist={playlistResponse}
        />
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render channel title", () => {
      expect(wrapper.find("h3").text()).toContain(
        playlistResponse.items[0].snippet.channelTitle
      );
    });

    it("should render correct number of items", () => {
      expect(wrapper.find(PlayListItem)).toHaveLength(
        playlistResponse.items.length
      );
    });

    it("should render more button and can respond to click", () => {
      const moreButton = wrapper.find(MoreButton);
      expect(moreButton.exists()).toBe(true);
      moreButton.prop("onClickMore")();
      expect(mockFetchPlaylist).toHaveBeenCalledWith(
        playlistResponse.nextPageToken,
        channelId
      );
    });
  });

  describe("When playlist fetched is empty", () => {
    beforeEach(() => {
      wrapper = shallow(
        <ChannelPlaylist
          channelId={channelId}
          fetchPlaylist={mockFetchPlaylist}
          clearError={mockClearError}
          error={null}
          playlist={playlistEmptyResponse}
        />
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render ErrorMessage component and no item", () => {
      expect(wrapper.find(ErrorMessage).exists()).toBe(true);
      expect(wrapper.find(ErrorMessage).prop("error")).toEqual({
        displayMessage: "No Playlist in this channel",
      });
      expect(wrapper.find(PlayListItem).exists()).toBe(false);
    });
  });
});
