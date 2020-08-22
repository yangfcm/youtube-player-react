import React from "react";
import { shallow } from "enzyme";
import UserImage from "components/common/UserImage";
import { authedUser } from "__test__/fixtures/auth";

describe("Test UserImage component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<UserImage user={authedUser} />);
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it("should render UserImage component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render correct image with user avatar", () => {
    expect(wrapper.find("img").prop("src")).toBe(authedUser.avatar);
  });

  it("can toggle dropdown menu by clicking user avatar", () => {
    const avatarDiv = wrapper.find("div#dropdown");
    expect(wrapper.find("div#dropdown-container").exists()).toBe(false);
    avatarDiv.prop("onClick")({ stopPropagation: jest.fn() });
    expect(wrapper.find("div#dropdown-container").exists()).toBe(true);
    avatarDiv.prop("onClick")({ stopPropagation: jest.fn() });
    expect(wrapper.find("div#dropdown-container").exists()).toBe(false);
  });
});
