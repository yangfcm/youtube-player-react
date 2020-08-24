import React from "react";
import { shallow } from "enzyme";
import { Link } from "react-router-dom";
import PlaylistItem from "components/modules/PlaylistItem";
import { playlistItemData } from "__test__/fixtures/playlist";

describe("Test PlaylistItem component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<PlaylistItem playlist={playlistItemData} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render correct image", () => {
    expect(wrapper.find("img").prop("src")).toBe(
      playlistItemData.snippet.thumbnails.medium.url
    );
  });

  it("should render link and navigate to playlist detail page", () => {
    const links = wrapper.find(Link);
    expect(links.at(0).prop("to")).toBe(`/playlist/${playlistItemData.id}`);
    expect(links.at(1).prop("to")).toBe(`/playlist/${playlistItemData.id}`);
  });

  it("should render correct title", () => {
    expect(wrapper.find("div.card-body").text()).toContain(
      playlistItemData.snippet.title
    );
  });

  it("should display how many videos in playlist", () => {
    expect(wrapper.find("span.badge").text()).toContain(
      playlistItemData.contentDetails.itemCount
    );
  });
});
