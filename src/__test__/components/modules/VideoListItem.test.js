import React from "react";
import { shallow } from "enzyme";
import { Link } from "react-router-dom";
import moment from "moment";
import VideoListItem from "components/modules/VideoListItem";
import { channelVideosResponse } from "__test__/fixtures/search";

describe("Test VideoListItem component", () => {
  let wrapper;
  const video = channelVideosResponse.items[0];
  const playlistId = "playlist-id";
  beforeEach(() => {
    wrapper = shallow(<VideoListItem video={video} playlistId={playlistId} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render correct video image", () => {
    expect(wrapper.find("img").prop("src")).toBe(
      video.snippet.thumbnails.medium.url
    );
  });

  it("should render correct links to that navigate to video and channel", () => {
    const links = wrapper.find(Link);
    expect(links.at(0).prop("to")).toBe(
      `/video/${video.id.videoId}?playlistId=${playlistId}`
    );
    expect(links.at(1).text()).toContain(video.snippet.title);
    expect(links.at(1).prop("to")).toBe(
      `/video/${video.id.videoId}?playlistId=${playlistId}`
    );
    expect(links.at(2).text()).toContain(video.snippet.channelTitle);
    expect(links.at(2).prop("to")).toBe(`/channel/${video.snippet.channelId}`);
  });

  it("should render correct links if playlist id is not given", () => {
    const wrapperWithoutPlaylist = shallow(<VideoListItem video={video} />);
    const links = wrapperWithoutPlaylist.find(Link);
    expect(links.at(0).prop("to")).toBe(`/video/${video.id.videoId}`);
    expect(links.at(1).prop("to")).toBe(`/video/${video.id.videoId}`);
  });

  it("should render correct publish date time", () => {
    expect(wrapper.find("p.font-weight-light").text()).toContain(
      moment(video.snippet.publishedAt).format("D MMM YYYY k:mm")
    );
  });
});
