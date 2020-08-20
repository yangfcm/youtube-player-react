import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import configMockStore from "redux-mock-store";
import NoSignIn from "components/common/NoSignIn";

describe("Test NoSignIn component", () => {
  let wrapper, mockStore;
  const googleSigninSpy = jest.fn();
  beforeEach(() => {
    mockStore = configMockStore([]);
    wrapper = mount(<NoSignIn googleSignin={googleSigninSpy} />, {
      wrappingComponent: Provider,
      wrappingComponentProps: { store: mockStore({}) },
    });
  });
  it("should render NoSignIn component", () => {
    expect(wrapper).toMatchSnapshot();
  });
  it("should have no-signin message", () => {
    expect(wrapper.find("h5").text()).toContain("You have not signed in");
  });
  it("should have Sign in button and correct button text", () => {
    expect(wrapper.find("button").exists()).toBeTruthy();
    expect(wrapper.find("button").text()).toContain("Sign In");
  });
  it("should call googleSignin function when Sign in button is clicked", () => {
    wrapper.find("button").simulate("click");
    expect(googleSigninSpy).toHaveBeenCalled();
  });
});
