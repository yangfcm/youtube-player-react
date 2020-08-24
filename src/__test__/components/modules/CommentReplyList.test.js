import React from "react";
import { shallow } from "enzyme";
import { CommentReplyList } from "components/modules/CommentReplyList";
import Loading from "components/common/Loading";
import CommentItem from "components/modules/CommentItem";
import {
  commentItem,
  commentItemNoReply,
  repliesResponse,
} from "__test__/fixtures/comment";

describe("Test CommentReplyList component", () => {
  let wrapper;
  const mockFetchCommentReplies = jest.fn();

  beforeEach(() => {
    wrapper = shallow(
      <CommentReplyList
        comment={commentItem}
        fetchCommentReplies={mockFetchCommentReplies}
      />
    );
    afterEach(() => {
      wrapper.unmount();
    });
  });
  it("should render component", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should not render button if there is no reply for the comment", () => {
    const noReplyWrapper = shallow(
      <CommentReplyList comment={commentItemNoReply} />
    );
    expect(noReplyWrapper.find("button.btn-link").exists()).toBe(false);
  });

  it("should render the count and replies and no replies initially", () => {
    expect(wrapper.find("button.btn-link").text()).toContain(
      commentItem.snippet.totalReplyCount
    );
    expect(wrapper.find("button.btn-link").text()).toContain("View");
    expect(wrapper.find("div#reply-list").exists()).toBe(false);
  });

  it("should render Loading component when click 'reply' button", () => {
    expect(wrapper.find(Loading).exists()).toBe(false);
    const replyButton = wrapper.find("button.btn-link");
    replyButton.simulate("click");
    expect(wrapper.find(Loading).exists()).toBe(true);
    expect(mockFetchCommentReplies).toHaveBeenCalled();
  });

  it("should render correct number of replies", () => {
    const replyButton = wrapper.find("button.btn-link");
    replyButton.simulate("click");
    wrapper.setState({
      replies: repliesResponse,
      isLoading: false,
    });
    expect(wrapper.find("div#reply-list").exists()).toBe(true);
    expect(wrapper.find(CommentItem)).toHaveLength(
      repliesResponse.items.length
    );
    replyButton.simulate("click"); // When click again, can hide replies.
    expect(wrapper.find("div#reply-list").exists()).toBe(false);
  });
});
