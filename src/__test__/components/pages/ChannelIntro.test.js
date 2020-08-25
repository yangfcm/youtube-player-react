import React from "react";
import { shallow } from "enzyme";
import moment from "moment";
import { ChannelIntro } from "components/pages/ChannelIntro";
import Loading from "components/common/Loading";
import ErrorMessage from "components/common/ErrorMessage";
import { separateNumber } from "utils/helper";
import { channelIntroData } from "__test__/fixtures/channel";
import { error } from "__test__/fixtures/error";

describe("Test ChannelIntro component", () => {
  let wrapper;
  const channelId = channelIntroData.items[0].id;
  const mockFetchChannelIntro = jest.fn();
  const mockClearError = jest.fn();
  const channelIntro = channelIntroData.items[0];

  afterEach(() => {
    wrapper.unmount();
  });

  describe("When component is initially rendered", () => {
    beforeEach(() => {
      wrapper = shallow(
        <ChannelIntro
          fetchChannelIntro={mockFetchChannelIntro}
          clearError={mockClearError}
          channelId={channelId}
        />
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render Loading component", () => {
      expect(wrapper.find(Loading).exists()).toBe(true);
    });

    it("should call fetchChannelIntro", () => {
      expect(mockFetchChannelIntro).toHaveBeenCalledWith(channelId);
    });
  });

  describe("When error occurs", () => {
    beforeEach(() => {
      wrapper = shallow(
        <ChannelIntro
          channelId={channelId}
          fetchChannelIntro={mockFetchChannelIntro}
          clearError={mockClearError}
          error={error}
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

  describe("When channel intro data is feteched", () => {
    beforeEach(() => {
      wrapper = shallow(
        <ChannelIntro
          channelId={channelId}
          fetchChannelIntro={mockFetchChannelIntro}
          clearError={mockClearError}
          error={null}
          channel={channelIntroData}
        />
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render correct information", () => {
      expect(wrapper.text()).toContain(
        moment(channelIntro.snippet.publishedAt).format("D MMM YYYY")
      );
      expect(wrapper.text()).toContain(channelIntro.snippet.description);
      expect(wrapper.text()).toContain(
        separateNumber(channelIntro.statistics.subscriberCount)
      );
      expect(wrapper.text()).toContain(
        separateNumber(channelIntro.statistics.viewCount)
      );
    });
  });
});
