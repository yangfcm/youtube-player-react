import React from "react";
import { shallow } from "enzyme";
import { Link } from "react-router-dom";
import SearchItem from "components/modules/SearchItem";
import VideoListItem from "components/modules/VideoListItem";
import { searchResultResponse } from "__test__/fixtures/search";

describe("Test SearchItem component", () => {
  let wrapper;
  const videoSearchResult = searchResultResponse.items.filter(
    (item) => item.id.kind === "youtube#video"
  )[0];
  const playlistSearchResult = searchResultResponse.items.filter(
    (item) => item.id.kind === "youtube#playlist"
  )[0];
  const channelSearchResult = searchResultResponse.items.filter(
    (item) => item.id.kind === "youtube#channel"
  )[0];

  describe("When searched item is video", () => {
    beforeEach(() => {
      wrapper = shallow(<SearchItem item={videoSearchResult} />);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render VideoListItem component", () => {
      expect(wrapper.find(VideoListItem).exists()).toBe(true);
      expect(wrapper.find(VideoListItem).prop("video")).toEqual(
        videoSearchResult
      );
    });
  });

  describe("When serachedItem is playlist", () => {
    beforeEach(() => {
      wrapper = shallow(<SearchItem item={playlistSearchResult} />);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render correct image", () => {
      expect(wrapper.find("img").prop("src")).toBe(
        playlistSearchResult.snippet.thumbnails.medium.url
      );
    });

    it("should render correct link", () => {
      const links = wrapper.find(Link);
      expect(links.at(0).prop("to")).toBe(
        `/playlist/${playlistSearchResult.id.playlistId}`
      );
      expect(links.at(1).prop("to")).toBe(
        `/playlist/${playlistSearchResult.id.playlistId}`
      );
      expect(links.at(2).prop("to")).toBe(
        `/channel/${playlistSearchResult.snippet.channelId}`
      );
      expect(links.at(2).text()).toContain(
        playlistSearchResult.snippet.channelTitle
      );
    });

    it("should render correct playlist title", () => {
      expect(wrapper.find("h6").text()).toBe(
        playlistSearchResult.snippet.title
      );
    });
  });

  describe("When searchedItem is channel", () => {
    beforeEach(() => {
      wrapper = shallow(<SearchItem item={channelSearchResult} />);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render correct image", () => {
      expect(wrapper.find("img").prop("src")).toBe(
        channelSearchResult.snippet.thumbnails.medium.url
      );
    });

    it("should render correct link", () => {
      const links = wrapper.find(Link);
      expect(links.at(0).prop("to")).toBe(
        `/channel/${channelSearchResult.id.channelId}`
      );
      expect(links.at(1).prop("to")).toBe(
        `/channel/${channelSearchResult.id.channelId}`
      );
    });

    it("should render channel title", () => {
      expect(wrapper.find("h6").text()).toContain(
        channelSearchResult.snippet.title
      );
    });

    it("should render title description", () => {
      expect(wrapper.find("p.font-weight-light").text()).toContain(
        channelSearchResult.snippet.description
      );
    });
  });
});
