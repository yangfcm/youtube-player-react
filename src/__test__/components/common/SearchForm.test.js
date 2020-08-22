import React from "react";
import { shallow } from "enzyme";
import SearchForm from "components/common/SearchForm";

describe("Test SearchForm component", () => {
  let wrapper;
  const mockPush = jest.fn();
  beforeEach(() => {
    wrapper = shallow(
      <SearchForm.WrappedComponent history={{ push: mockPush }} />
    );
  });
  afterEach(() => {
    jest.clearAllMocks();
    wrapper.unmount();
  });

  it("should render component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render form", () => {
    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.find("input").exists()).toBe(true);
    expect(wrapper.find("button").exists()).toBe(true);
  });

  it("should input value in the form", () => {
    const input = wrapper.find("input");
    const inputValue = "google dev";
    input.prop("onChange")({ target: { value: inputValue } });
    expect(wrapper.state("search")).toBe(inputValue);
  });

  it("should redirect to results page with search keyword when clicking search button with some input", () => {
    const inputValue = "google dev";
    const input = wrapper.find("input");
    const form = wrapper.find("form");
    input.prop("onChange")({ target: { value: inputValue } });
    form.prop("onSubmit")({ preventDefault: () => {} });
    expect(mockPush).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith(`/results?q=${inputValue}`);
    expect(wrapper.state("search")).toBe("");
  });

  it("should not redirect to results page when clicking search button with no input", () => {
    const form = wrapper.find("form");
    wrapper.setState({ search: "" });
    form.prop("onSubmit")({ preventDefault: () => {} });
    expect(mockPush).toHaveBeenCalledTimes(0);
  });
});
