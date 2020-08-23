import React from "react";
import { shallow } from "enzyme";
import CommentItem from "components/modules/CommentItem";
import { commentItem } from "__test__/fixtures/comment";

describe("Test CommentItem component", () => {
  let wrapper;
  const comment = commentItem.snippet.topLevelComment.snippet;

  beforeEach(() => {
    wrapper = shallow(<CommentItem comment={comment} />);
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it("should render component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should render author's avatar", () => {
    expect(wrapper.find("img").prop("src")).toBe(comment.authorProfileImageUrl);
  });

  it("should render author's username", () => {
    expect(wrapper.find("span.font-weight-bold").text()).toContain(
      comment.authorDisplayName
    );
  });

  it("should render comment text", () => {
    expect(
      wrapper.find("div#comment-text").prop("dangerouslySetInnerHTML").__html
    ).toContain(comment.textDisplay);
  });
});
