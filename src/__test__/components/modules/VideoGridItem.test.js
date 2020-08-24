import React from "react";
import { shallow } from "enzyme";
import { Link } from "react-router-dom";
import moment from "moment";
import VideoGridItem from "components/modules/VideoGridItem";
import { separateNumber } from "utils/helper";
import { videosResponse } from "__test__/fixtures/video";

describe("Test VideoGridItem component", () => {
  let wrapper;
  const video = videosResponse.items[0];

  beforeEach(() => {
    wrapper = shallow(<VideoGridItem video={video} />);
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
    expect(links.at(0).prop("to")).toBe(`/video/${video.id}`);
    expect(links.at(1).text()).toContain(video.snippet.title);
    expect(links.at(1).prop("to")).toBe(`/video/${video.id}`);
    expect(links.at(2).text()).toContain(video.snippet.channelTitle);
    expect(links.at(2).prop("to")).toBe(`/channel/${video.snippet.channelId}`);
  });

  it("should render correct view count and publish date time", () => {
    const muteText = wrapper.find("div.text-muted").text();
    expect(muteText).toContain(separateNumber(video.statistics.viewCount));
    expect(muteText).toContain(moment(video.snippet.publishedAt).fromNow());
  });
});
