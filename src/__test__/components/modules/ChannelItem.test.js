import React from "react";
import { shallow } from "enzyme";
import { Link } from "react-router-dom";
import ChannelItem from "components/modules/ChannelItem";
import { channelItemData } from "__test__/fixtures/channel";

describe("Test ChannelItem component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ChannelItem channel={channelItemData} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render ChannelItem component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("links should have correct url", () => {
    expect(wrapper.find(Link).at(0).prop("to")).toBe(
      `/channel/${channelItemData.snippet.resourceId.channelId}`
    );
    expect(wrapper.find(Link).at(1).prop("to")).toBe(
      `/channel/${channelItemData.snippet.resourceId.channelId}`
    );
  });

  it("should render correct channel image", () => {
    expect(wrapper.find("img").prop("src")).toBe(
      channelItemData.snippet.thumbnails.medium.url
    );
  });

  it("should render correct channel title", () => {
    expect(wrapper.find("h5").text()).toContain(channelItemData.snippet.title);
  });
});
