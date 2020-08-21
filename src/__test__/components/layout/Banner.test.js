import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import configMockStore from "redux-mock-store";
import Banner from "components/layout/Banner";
import { authedUser } from "__test__/fixtures/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

describe("Test Banner component", () => {
  let wrapper, mockStore;
  describe("Test Banner component with no auth data", () => {
    beforeEach(() => {
      mockStore = configMockStore([]);
      wrapper = mount(
        <Provider
          store={mockStore({
            auth: {
              signedIn: null,
              user: null,
            },
          })}
        >
          <Banner />
        </Provider>
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should not render image and other information", () => {
      expect(wrapper.find("img").exists()).toBe(false);
      expect(wrapper.find(FontAwesomeIcon).exists()).toBe(false);
      expect(wrapper.find("h3").text()).toBeFalsy();
    });

    afterEach(() => {
      wrapper.unmount();
    });
  });
  describe("Test Banner component with user logged in", () => {
    beforeEach(() => {
      mockStore = configMockStore();
      wrapper = mount(
        <Provider
          store={mockStore({
            auth: {
              signedIn: true,
              user: authedUser,
            },
          })}
        >
          <Banner />
        </Provider>
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render user's image, not default image", () => {
      expect(wrapper.find("img").prop("src")).toBe(authedUser.avatar);
      expect(wrapper.find(FontAwesomeIcon).exists()).toBe(false);
    });
    it("should display user's username", () => {
      expect(wrapper.find("h3").text()).toContain(
        "Welcome, " + authedUser.username
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });
  });
  describe("Test Banner component with no user logged in", () => {
    beforeEach(() => {
      mockStore = configMockStore([]);
      wrapper = mount(
        <Provider
          store={mockStore({
            auth: {
              signedIn: false,
              user: null,
            },
          })}
        >
          <Banner />
        </Provider>
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render default image rather than user's image", () => {
      expect(wrapper.find(FontAwesomeIcon).prop("icon")).toBe("user-astronaut");
      expect(wrapper.find("img").exists()).toBe(false);
    });
    it("should not display user's username", () => {
      expect(wrapper.find("h3").text()).toBe("Welcome");
    });

    afterEach(() => {
      wrapper.unmount();
    });
  });
});
