import React from "react";
import { shallow } from "enzyme";
import { Video } from "components/pages/Video";
import VideoPlayer from "components/modules/VideoPlayer";
import VideoDetail from "components/modules/VideoDetail";
import VideoList from "components/modules/VideoList";
import CommentsList from "components/modules/CommentsList";
import Loading from "components/common/Loading";
import MoreButton from "components/modules/MoreButton";
import ErrorMessage from "components/common/ErrorMessage";
import { playlistDetailResponse, playlistId } from "__test__/fixtures/playlist";
import {
  videoResponse,
  videosResponse,
  videoId,
  videoErrorResponse,
} from "__test__/fixtures/video";

describe("Test Video component", () => {
  let wrapper;
  const mockFetchVideo = jest.fn();
  const mockFetchPlaylistDetail = jest.fn();
  const mockSearchVideos = jest.fn();
  const mockClearError = jest.fn();
  const match = {
    params: {
      id: videoId,
    },
  };
  const location = {
    search: "",
  };
  const locationPlaylist = {
    search: `?playlistId=${playlistId}`,
  };

  afterEach(() => {
    wrapper.unmount();
  });

  describe("When component is initially rendered", () => {
    beforeEach(() => {
      wrapper = shallow(
        <Video
          fetchVideo={mockFetchVideo}
          fetchPlaylistDetail={mockFetchPlaylistDetail}
          searchVideos={mockSearchVideos}
          clearError={mockClearError}
          match={match}
          location={location}
        />
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render Loading component", () => {
      expect(wrapper.find(Loading).exists()).toBe(true);
    });

    it("should fetch video and fetch videos on sidebar", () => {
      expect(mockFetchVideo).toHaveBeenCalledWith(videoId);
      expect(mockSearchVideos).toHaveBeenCalledWith({
        relatedToVideoId: videoId,
        type: "video",
      });
    });
  });

  describe("When component is initially rendered (video is from a playlist)", () => {
    beforeEach(() => {
      wrapper = shallow(
        <Video
          fetchVideo={mockFetchVideo}
          fetchPlaylistDetail={mockFetchPlaylistDetail}
          searchVideos={mockSearchVideos}
          clearError={mockClearError}
          match={match}
          location={locationPlaylist}
        />
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should fetch video and fetch videos from the playlist", () => {
      expect(mockFetchVideo).toHaveBeenCalledWith(videoId);
      expect(mockFetchPlaylistDetail).toHaveBeenCalledWith(playlistId);
    });
  });

  describe("When error occurs", () => {
    beforeEach(() => {
      wrapper = shallow(
        <Video
          fetchVideo={mockFetchVideo}
          fetchPlaylistDetail={mockFetchPlaylistDetail}
          searchVideos={mockSearchVideos}
          clearError={mockClearError}
          match={match}
          location={location}
          error={videoErrorResponse}
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

  describe("When video is fetched", () => {
    beforeEach(() => {
      wrapper = shallow(
        <Video
          fetchVideo={mockFetchVideo}
          fetchPlaylistDetail={mockFetchPlaylistDetail}
          searchVideos={mockSearchVideos}
          clearError={mockClearError}
          match={match}
          location={location}
          error={null}
          video={videoResponse}
          videos={videosResponse}
          playlistDetail={playlistDetailResponse}
        />
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render VideoPlayer and pass video id to it", () => {
      const videoPlayer = wrapper.find(VideoPlayer);
      expect(videoPlayer.exists()).toBe(true);
      expect(videoPlayer.prop("videoId")).toBe(videoId);
    });

    it("should render VideoDetail component and pass video object to it", () => {
      const videoDetail = wrapper.find(VideoDetail);
      expect(videoDetail.exists()).toBe(true);
      expect(videoDetail.prop("video")).toEqual(videoResponse.items[0]);
    });

    it("should render CommentsList component and pass video and video id to it", () => {
      const commentsList = wrapper.find(CommentsList);
      expect(commentsList.exists()).toBe(true);
      expect(commentsList.prop("video")).toEqual(videoResponse.items[0]);
      expect(commentsList.prop("videoId")).toBe(videoId);
    });

    it("should render VideoList component and pass videos list to it", () => {
      const videoList = wrapper.find(VideoList);
      expect(videoList.exists()).toBe(true);
      expect(videoList.prop("videoList")).toEqual(videosResponse.items);
    });

    it("should render MoreButton component and can respond to click", () => {
      const moreButton = wrapper.find(MoreButton);
      moreButton.prop("onClickMore")();
      expect(mockSearchVideos).toHaveBeenCalledWith(
        { relatedToVideoId: videoId, type: "video" },
        videosResponse.nextPageToken
      );
    });
  });

  describe("When video from a playlist is fetched", () => {
    beforeEach(() => {
      wrapper = shallow(
        <Video
          fetchVideo={mockFetchVideo}
          fetchPlaylistDetail={mockFetchPlaylistDetail}
          searchVideos={mockSearchVideos}
          clearError={mockClearError}
          match={match}
          location={locationPlaylist}
          error={null}
          video={videoResponse}
          videos={videosResponse}
          playlistDetail={playlistDetailResponse}
        />
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render VideoList component and pass videos list to it", () => {
      const videoList = wrapper.find(VideoList);
      expect(videoList.exists()).toBe(true);
      expect(videoList.prop("videoList")).toEqual(playlistDetailResponse.items);
    });

    it("should render MoreButton component and can respond to click", () => {
      const moreButton = wrapper.find(MoreButton);
      moreButton.prop("onClickMore")();
      expect(mockFetchPlaylistDetail).toHaveBeenCalledWith(
        playlistId,
        playlistDetailResponse.nextPageToken
      );
    });
  });
});
