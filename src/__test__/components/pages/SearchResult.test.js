import React from "react";
import { shallow } from "enzyme";
import { SearchResult } from "components/pages/SearchResult";
import SearchResultList from "components/modules/SearchResultList";
import MoreButton from "components/modules/MoreButton";
import Loading from "components/common/Loading";
import ErrorMessage from "components/common/ErrorMessage";
import {
  keyword,
  searchResultEmptyResponse,
  searchResultResponse,
  searchErrorResponse,
} from "__test__/fixtures/search";

describe("Test SearchResult component", () => {
  let wrapper;
  const mockSearchVideos = jest.fn();
  const mockClearError = jest.fn();
  const location = {
    search: `?q=${keyword}`,
  };

  afterEach(() => {
    wrapper.unmount();
  });

  describe("When component is initially rendered", () => {
    beforeEach(() => {
      wrapper = shallow(
        <SearchResult
          searchVideos={mockSearchVideos}
          clearError={mockClearError}
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

    it("should fetch search result", () => {
      expect(mockSearchVideos).toHaveBeenCalledWith({ q: keyword });
    });
  });

  describe("When error occurs", () => {
    beforeEach(() => {
      wrapper = shallow(
        <SearchResult
          searchVideos={mockSearchVideos}
          clearError={mockClearError}
          location={location}
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

  describe("When search result is fetched", () => {
    beforeEach(() => {
      wrapper = shallow(
        <SearchResult
          searchVideos={mockSearchVideos}
          clearError={mockClearError}
          location={location}
          error={null}
          videos={searchResultResponse}
        />
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render SearchResultList component and pass data to it", () => {
      const searchResultList = wrapper.find(SearchResultList);
      expect(searchResultList.exists()).toBe(true);
      expect(searchResultList.prop("searchResultList")).toEqual(
        searchResultResponse.items
      );
    });

    it("should render more button and respond to click", () => {
      const moreButton = wrapper.find(MoreButton);
      expect(moreButton.exists()).toBe(true);
      moreButton.prop("onClickMore")();
      expect(mockSearchVideos).toHaveBeenCalledWith(
        { q: keyword },
        searchResultResponse.nextPageToken
      );
    });

    it("should update component when search keyword is changed", () => {
      wrapper.setProps({
        location: {
          search: "?q=new",
        },
      });
      expect(mockSearchVideos).toHaveBeenCalledWith({ q: "new" });
    });
  });

  describe("When no result is fetched", () => {
    beforeEach(() => {
      wrapper = shallow(
        <SearchResult
          searchVideos={mockSearchVideos}
          clearError={mockClearError}
          location={location}
          error={null}
          videos={searchResultEmptyResponse}
        />
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render ErrorMessage component", () => {
      expect(wrapper.find(ErrorMessage).exists()).toBe(true);
      expect(wrapper.find(ErrorMessage).prop("error")).toEqual({
        displayMessage: `No video found with the key word: ${keyword}`,
      });
    });
  });
});
