import React from "react";
import { shallow } from "enzyme";
import Footer from "components/layout/Footer";

describe("Test Footer component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Footer />);
  });

  it("should render component", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
