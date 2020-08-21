import React from "react";
import { shallow } from "enzyme";
import { NavLink } from "react-router-dom";
import Menu from "components/layout/Menu";
import { mainMenuItems } from "settings";

describe("Test Menu component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Menu menuItems={mainMenuItems} />);
  });

  it("should render component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have correct number of links", () => {
    expect(wrapper.find(NavLink)).toHaveLength(mainMenuItems.length);
  });
});
