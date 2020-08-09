import React from "react";
import { shallow } from "enzyme";
import ErrorMessage from "components/common/ErrorMessage";
import { DEFAULT_ERROR_MSG } from "actions/default-error-msg";
import { error } from "__test__/fixtures/error";

describe("Test ErrorMessage component", () => {
  it("should render ErrorMessage component correctly", () => {
    const wrapper = shallow(
      <ErrorMessage
        error={{
          ...error.response.data.error,
          displayMessage: DEFAULT_ERROR_MSG.FAILED_TO_FETCH_VIDEO,
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
