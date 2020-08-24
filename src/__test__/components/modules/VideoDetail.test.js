import React from "react";
import { shallow } from "enzyme";
import { Link } from "react-router-dom";
import moment from "moment";
import VideoDetail from "components/modules/VideoDetail";
import { videoResponse } from "__test__/fixtures/video";
import { separateNumber } from "utils/helper";

describe("Test videoDetail component", () => {
  let wrapper;
  const video = videoResponse.items[0];
  beforeEach(() => {
    wrapper = shallow(<VideoDetail video={video} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it("should render component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render video title", () => {
    expect(wrapper.find("h3").text()).toContain(video.snippet.title);
  });

  it("should render channel title and link", () => {
    const link = wrapper.find(Link);
    expect(link.exists()).toBe(true);
    expect(link.prop("to")).toBe(`/channel/${video.snippet.channelId}`);
    expect(link.text()).toContain(video.snippet.channelTitle);
  });

  it("should render correct publish datetime and view count", () => {
    expect(wrapper.find("div#video-mega-info").text()).toContain(
      moment(video.snippet.publishedAt).format("D MMM YYYY k:mm")
    );
    expect(wrapper.find("div#video-mega-info").text()).toContain(
      separateNumber(video.statistics.viewCount)
    );
  });

  it("should render correct thumbs up/down count", () => {
    expect(wrapper.find("div#video-stat-info").text()).toContain(
      separateNumber(video.statistics.likeCount)
    );
    expect(wrapper.find("div#video-stat-info").text()).toContain(
      separateNumber(video.statistics.dislikeCount)
    );
  });

  it("should render video description", () => {
    expect(
      wrapper.find("#video-description").prop("dangerouslySetInnerHTML")
    ).toEqual({
      __html: video.snippet.description,
    });
  });
});
