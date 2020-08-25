import React from "react";
import { shallow } from "enzyme";
import { Home } from "components/pages/Home";
import Banner from "components/layout/Banner";
import Menu from "components/layout/Menu";
import VideoGrid from "components/modules/VideoGrid";
import Loading from "components/common/Loading";
import ErrorMessage from "components/common/ErrorMessage";
import MoreButton from "components/modules/MoreButton";
import { searchErrorResponse } from "__test__/fixtures/search";
import { videosResponse } from "__test__/fixtures/video";

describe("Test Home page component", () => {
  let wrapper;
  const mockFetchVideos = jest.fn();
  const mockClearError = jest.fn();
  afterEach(() => {
    wrapper.unmount();
  });

  describe("When component is initially rendered", () => {
    beforeEach(() => {
      wrapper = shallow(
        <Home fetchVideos={mockFetchVideos} clearError={mockClearError} />
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

    it("should call fetchVideos", () => {
      expect(mockFetchVideos).toHaveBeenCalled();
      expect(mockFetchVideos).toHaveBeenCalledWith({ chart: "mostPopular" });
    });
  });

  describe("When error occurs", () => {
    beforeEach(() => {
      wrapper = shallow(
        <Home
          fetchVideos={mockFetchVideos}
          clearError={mockClearError}
          error={searchErrorResponse}
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

  describe("When videos are fetched", () => {
    beforeEach(() => {
      wrapper = shallow(
        <Home
          fetchVideos={mockFetchVideos}
          clearError={mockClearError}
          error={null}
          videos={videosResponse}
        />
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render VideoGrid component and pass videos to it", () => {
      const videoGrid = wrapper.find(VideoGrid);
      expect(videoGrid.exists()).toBe(true);
      expect(videoGrid.prop("videos")).toEqual(videosResponse.items);
    });

    it("should have MoreButton component and can respond to click", () => {
      const moreButton = wrapper.find(MoreButton);
      expect(moreButton.exists()).toBe(true);
      moreButton.prop("onClickMore")();
      expect(mockFetchVideos).toHaveBeenCalled();
      expect(mockFetchVideos).toHaveBeenCalledWith(
        { chart: "mostPopular" },
        videosResponse.nextPageToken
      );
    });
  });
});
