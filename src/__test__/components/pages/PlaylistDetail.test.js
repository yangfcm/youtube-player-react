import React from "react";
import { shallow } from "enzyme";
import { PlayListDetail } from "components/pages/PlayListDetail";
import VideoList from "components/modules/VideoList";
import MoreButton from "components/modules/MoreButton";
import Loading from "components/common/Loading";
import ErrorMessage from "components/common/ErrorMessage";
import {
  playlistDetailResponse,
  playlistErrorResponse,
  playlistId,
} from "__test__/fixtures/playlist";

describe("Test PlaylistDetail component", () => {
  let wrapper;
  const mockFetchPlaylistDetail = jest.fn();
  const mockClearError = jest.fn();

  afterEach(() => {
    wrapper.unmount();
  });

  describe("When component is initially rendered", () => {
    beforeEach(() => {
      wrapper = shallow(
        <PlayListDetail
          fetchPlaylistDetail={mockFetchPlaylistDetail}
          clearError={mockClearError}
          match={{ params: { id: playlistId } }}
        />
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render Loading component", () => {
      expect(wrapper.find(Loading).exists()).toBe(true);
    });

    it("should fetch playlist detail", () => {
      expect(mockFetchPlaylistDetail).toHaveBeenCalledWith(playlistId);
    });
  });

  describe("When error occurs", () => {
    beforeEach(() => {
      wrapper = shallow(
        <PlayListDetail
          fetchPlaylistDetail={mockFetchPlaylistDetail}
          clearError={mockClearError}
          match={{ params: { id: playlistId } }}
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

  describe("When videos in the playlist is fetched", () => {
    beforeEach(() => {
      wrapper = shallow(
        <PlayListDetail
          fetchPlaylistDetail={mockFetchPlaylistDetail}
          clearError={mockClearError}
          match={{ params: { id: playlistId } }}
          error={null}
          playlistDetail={playlistDetailResponse}
        />
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render VideoList component and pass videos and playlist id to it", () => {
      const videoList = wrapper.find(VideoList);
      expect(videoList.exists()).toBe(true);
      expect(videoList.prop("videoList")).toEqual(playlistDetailResponse.items);
      expect(videoList.prop("playlistId")).toBe(playlistId);
    });

    it("should render more button and respond to click", () => {
      const moreButton = wrapper.find(MoreButton);
      expect(moreButton.exists()).toBe(true);
      moreButton.prop("onClickMore")();
      expect(mockFetchPlaylistDetail).toHaveBeenCalledWith(
        playlistId,
        playlistDetailResponse.nextPageToken
      );
    });
  });
});
