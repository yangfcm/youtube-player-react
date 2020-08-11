import React from "react";
import { shallow } from "enzyme";
import ErrorMessage from "components/common/ErrorMessage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DEFAULT_ERROR_MSG } from "actions/default-error-msg";
import { error } from "__test__/fixtures/error";

describe("Test ErrorMessage component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <ErrorMessage
        error={{
          ...error.response.data.error,
          displayMessage: DEFAULT_ERROR_MSG.FAILED_TO_FETCH_VIDEO,
        }}
      />
    );
  });
  it("should match snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should have exclamation icon on ErrorMessage component", () => {
    const fontComp = wrapper.find(FontAwesomeIcon);
    expect(fontComp.exists()).toBe(true);
    expect(fontComp.prop("icon")).toBe("exclamation-triangle");
  });

  it("should display correct error message", () => {
    const errorComp = wrapper.find(".text-danger");
    expect(errorComp.text()).toContain(DEFAULT_ERROR_MSG.FAILED_TO_FETCH_VIDEO);
  });
});
