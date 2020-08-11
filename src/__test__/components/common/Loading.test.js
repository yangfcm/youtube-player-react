import React from "react";
import { shallow } from "enzyme";
import Loading from "components/common/Loading";

describe("Test Loading component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Loading />);
  });
  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
