import React from "react";
import { shallow } from "enzyme";
import Loading from "components/common/Loading";

describe("Test Loading component", () => {
  it("should render Loading component correctly", () => {
    const wrapper = shallow(<Loading />);
    expect(wrapper).toMatchSnapshot();
  });
});
