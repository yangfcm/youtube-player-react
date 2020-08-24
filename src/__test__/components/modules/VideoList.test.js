import React from "react";
import { shallow } from "enzyme";
import VideoList from "components/modules/VideoList";
import VideoListItem from "components/modules/VideoListItem";
import { videosResponse } from "__test__/fixtures/video";

describe("Test VideoList component", () => {
  let wrapper;
  const videos = videosResponse.items;

  beforeEach(() => {
    wrapper = shallow(<VideoList videoList={videos} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render comment number of video items", () => {
    expect(wrapper.find(VideoListItem)).toHaveLength(videos.length);
  });
});
