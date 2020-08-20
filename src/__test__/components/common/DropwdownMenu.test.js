import React from "react";
import { Provider } from "react-redux";
import { Router, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import { mount } from "enzyme";
import configMockStore from "redux-mock-store";
import DropdownMenu from "components/common/DropdownMenu";
import { mainMenuItems } from "settings";

describe("Test DropdownMenu component", () => {
  let wrapper, mockStore;
  const googleSignoutSpy = jest.fn();
  const history = createBrowserHistory();

  beforeEach(() => {
    mockStore = configMockStore([]);
    wrapper = mount(
      <Provider store={mockStore({})}>
        <Router history={history}>
          <DropdownMenu
            googleSignout={googleSignoutSpy}
            menuItems={mainMenuItems}
          />{" "}
        </Router>
      </Provider>
    );
  });

  it("should render DropdownMenu component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render three links", () => {
    expect(wrapper.find(Link)).toHaveLength(mainMenuItems.length);
  });

  it("should have Sign out link", () => {
    expect(wrapper.find("li.list-group-item-warning").exists()).toBe(true);
  });

  it("click Sign out link should call googleSignout function", () => {
    wrapper.find("li.list-group-item-warning").simulate("click");
    expect(googleSignoutSpy).toHaveBeenCalled();
  });
});
