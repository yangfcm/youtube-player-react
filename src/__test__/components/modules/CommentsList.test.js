import React from "react";
import { shallow } from "enzyme";
import { CommentsList } from "components/modules/CommentsList";
import Loading from "components/common/Loading";
import ErrorMessage from "components/common/ErrorMessage";
import CommentForm from "components/modules/CommentForm";
import CommentItem from "components/modules/CommentItem";
import CommentReplyList from "components/modules/CommentReplyList";
import MoreButton from "components/modules/MoreButton";
import {
  commentsResponse,
  commentErrorResponse,
  emptyCommentResponse,
} from "__test__/fixtures/comment";

describe("Test CommentsList component", () => {
  let wrapper;
  const mockFetchComments = jest.fn();
  const mockClearError = jest.fn();
  const mockAccessToken = "mock_access_token";
  Object.defineProperty(global, "localStorage", {
    value: {
      getItem: jest.fn(() => mockAccessToken),
    },
    writable: true,
  });
  const videoId = commentsResponse.items[0].snippet.videoId;
  describe("When component is initially rendered", () => {
    beforeEach(() => {
      wrapper = shallow(
        <CommentsList
          fetchComments={mockFetchComments}
          clearError={mockClearError}
          videoId={videoId}
        />
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should render Loading component", () => {
      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find(Loading).exists()).toBe(true);
    });

    it("fetchComments should be called", () => {
      expect(mockFetchComments).toHaveBeenCalled();
      expect(mockFetchComments).toHaveBeenCalledWith(
        videoId,
        null,
        mockAccessToken
      );
    });
  });

  describe("When error occurs...", () => {
    beforeEach(() => {
      wrapper = shallow(
        <CommentsList
          fetchComments={mockFetchComments}
          clearError={mockClearError}
          error={commentErrorResponse}
        />
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render ErrorMessage component", () => {
      expect(wrapper.find(ErrorMessage).exists()).toBe(true);
      expect(wrapper.find(ErrorMessage).prop("error")).toEqual(
        commentErrorResponse
      );
    });
  });

  describe("When comment is disabled", () => {
    beforeEach(() => {
      wrapper = shallow(
        <CommentsList
          fetchComments={mockFetchComments}
          clearError={mockClearError}
          videoId={videoId}
          isDisabled={true}
        />
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should show disabled information", () => {
      expect(wrapper.text()).toContain("Comment is disabled");
    });
  });

  describe("When comments are successfully fetched", () => {
    beforeEach(() => {
      wrapper = shallow(
        <CommentsList
          fetchComments={mockFetchComments}
          clearError={mockClearError}
          videoId={videoId}
          isDisabled={false}
          comments={commentsResponse}
        />
      );
    });

    afterEach(() => {
      jest.clearAllMocks();
      wrapper.unmount();
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render Comment form", () => {
      expect(wrapper.find(CommentForm).exists()).toBe(true);
    });

    it("should render correct number of comment items and comment reply list", () => {
      expect(wrapper.find(CommentItem)).toHaveLength(
        commentsResponse.items.length
      );
      expect(wrapper.find(CommentReplyList)).toHaveLength(
        commentsResponse.items.length
      );
    });

    it("should render more comments button if there is more than one page", () => {
      expect(wrapper.find(MoreButton).exists()).toBe(true);
    });
    it("more button should fetch comments for next page", () => {
      jest.clearAllMocks();
      wrapper.find(MoreButton).prop("onClickMore")();
      expect(mockFetchComments).toHaveBeenCalled();
      expect(mockFetchComments).toHaveBeenCalledWith(
        videoId,
        commentsResponse.nextPageToken,
        mockAccessToken
      );
    });
  });

  describe("If there is no comment for the video", () => {
    beforeEach(() => {
      wrapper = shallow(
        <CommentsList
          fetchComments={mockFetchComments}
          clearError={mockClearError}
          videoId={videoId}
          isDisabled={false}
          comments={emptyCommentResponse}
        />
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should display No comment message", () => {
      expect(wrapper.text()).toContain("No comment");
    });

    it("should not render comment item or comment replies", () => {
      expect(wrapper.find(CommentItem).exists()).toBe(false);
      expect(wrapper.find(CommentReplyList).exists()).toBe(false);
    });
  });
});
