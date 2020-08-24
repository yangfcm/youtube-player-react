import React from "react";
import { shallow } from "enzyme";
import VideoGrid from "components/modules/VideoGrid";
import VideoGridItem from "components/modules/VideoGridItem";
import { videosResponse } from "__test__/fixtures/video";

describe("Test VideoGrid component", () => {
  let wrapper;
  const videos = videosResponse.items;

  beforeEach(() => {
    wrapper = shallow(<VideoGrid videos={videos} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render comment number of video items", () => {
    expect(wrapper.find(VideoGridItem)).toHaveLength(videos.length);
  });
});
