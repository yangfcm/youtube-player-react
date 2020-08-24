import React from "react";
import { shallow } from "enzyme";
import { Link } from "react-router-dom";
import NotFound from "components/pages/NotFound";
import Error from "components/common/ErrorMessage";

describe("Test NotFound page", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NotFound />);
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it("should render component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render Error component", () => {
    expect(wrapper.find(Error).exists()).toBe(true);
    expect(wrapper.find(Error).prop("error")).toEqual({
      displayMessage: "The page you requested doesn't exist",
    });
  });

  it("should render Link and it navigates to homepage", () => {
    const link = wrapper.find(Link);
    expect(link.exists()).toBe(true);
    expect(link.prop("to")).toBe("/");
    expect(link.text()).toContain("Back to Homepage");
  });
});
