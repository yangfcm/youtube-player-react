import React from "react";
import { shallow } from "enzyme";
import VideoPlayer from "components/modules/VideoPlayer";
import { videoId } from "__test__/fixtures/video";

describe("Test VideoPlayer component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<VideoPlayer videoId={videoId} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render iframe with correct url", () => {
    const iframe = wrapper.find("iframe");
    expect(iframe.exists()).toBe(true);
    expect(iframe.prop("src")).toBe(`https://www.youtube.com/embed/${videoId}`);
  });
});
