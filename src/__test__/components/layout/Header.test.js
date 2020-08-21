import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { mount } from "enzyme";
import configMockStore from "redux-mock-store";
import Header from "components/layout/Header";
import UserImage from "components/common/UserImage";
import { authedUser } from "__test__/fixtures/auth";

describe("Test Header component", () => {
  let wrapper;
  const mockStore = configMockStore();
  const googleSigninSpy = jest.fn();
  describe("Test Header when there is no user auth info returned", () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider
          store={mockStore({
            auth: { signedIn: null, user: null },
          })}
        >
          <Router>
            <Header />
          </Router>
        </Provider>
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should not have sign in button and not user's image", () => {
      expect(wrapper.find(UserImage).exists()).toBe(false);
      expect(wrapper.find("button.btn-primary").exists()).toBe(false);
    });
  });

  describe("Test Header when user is not logged in", () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider
          store={mockStore({
            auth: { signedIn: false, user: null },
          })}
        >
          <Router>
            <Header googleSignin={googleSigninSpy} />
          </Router>
        </Provider>
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should have sign in button and no user's image", () => {
      expect(wrapper.find(UserImage).exists()).toBe(false);
      expect(wrapper.find("button.btn-primary").exists()).toBe(true);
    });

    it("should call googleSignin when clicking sign in button", () => {
      wrapper.find("button.btn-primary").simulate("click");
      expect(googleSigninSpy).toHaveBeenCalled();
    });
  });

  describe("Test Header when user is logged in", () => {
    beforeEach(() => {
      wrapper = mount(
        <Provider
          store={mockStore({
            auth: { signedIn: true, user: authedUser },
          })}
        >
          <Router>
            <Header />
          </Router>
        </Provider>
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should not have sign in button but have user's image", () => {
      expect(wrapper.find(UserImage).exists()).toBe(true);
      expect(wrapper.find(UserImage).prop("user")).toEqual(authedUser);
      expect(wrapper.find("button.btn-primary").exists()).toBe(false);
    });
  });
});
