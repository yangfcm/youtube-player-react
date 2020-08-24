import React from "react";
import { shallow } from "enzyme";
import SearchResultList from "components/modules/SearchResultList";
import SearchItem from "components/modules/SearchItem";
import { searchResultResponse } from "__test__/fixtures/search";

describe("Test SearchResultList component", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <SearchResultList searchResultList={searchResultResponse.items} />
    );
  });
  afterEach(() => {
    wrapper.unmount();
  });

  it("should render component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render correct number of items", () => {
    expect(wrapper.find(SearchItem)).toHaveLength(
      searchResultResponse.items.length
    );
  });
});
