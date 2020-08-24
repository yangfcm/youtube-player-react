import React from "react";
import { shallow } from "enzyme";
import MoreButton from "components/modules/MoreButton";

describe("Test MoreButton component", () => {
  let wrapper;
  const mockOnClickMore = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <MoreButton children={"More videos"} onClickMore={mockOnClickMore} />
    );
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it("should render component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render correct text on the button", () => {
    expect(wrapper.find("button").text()).toContain("More videos");
  });

  it("should call onClickMore when clicking more button", () => {
    wrapper.find("button").simulate("click");
    expect(mockOnClickMore).toHaveBeenCalled();
  });
});
