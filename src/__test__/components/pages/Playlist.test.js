import React from "react";
import { shallow } from "enzyme";
import { PlayList } from "components/pages/PlayList";
import Banner from "components/layout/Banner";
import Menu from "components/layout/Menu";
import Loading from "components/common/Loading";
import ErrorMessage from "components/common/ErrorMessage";
import MoreButton from "components/modules/MoreButton";
import NoSignedIn from "components/common/NoSignIn";
import PlayListItem from "components/modules/PlayListItem";
import { authedUser } from "__test__/fixtures/auth";
import {
  playlistResponse,
  playlistEmptyResponse,
  playlistErrorResponse,
} from "__test__/fixtures/playlist";

describe("Test Playlist component", () => {
  let wrapper;
  const mockFetchPlaylist = jest.fn();
  const mockClearError = jest.fn();
  const mockAccessToken = "mock_access_token";
  Object.defineProperty(global, "localStorage", {
    value: {
      getItem: jest.fn(() => mockAccessToken),
      setItem: jest.fn(() => null),
    },
    writable: true,
  });

  afterEach(() => {
    wrapper.unmount();
  });

  describe("When user is not logged in", () => {
    beforeEach(() => {
      wrapper = shallow(
        <PlayList
          auth={{ signedIn: false, user: null }}
          fetchPlaylist={mockFetchPlaylist}
          clearError={mockClearError}
        />
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should prompt user is not logged in", () => {
      expect(wrapper.find(NoSignedIn).exists()).toBe(true);
    });

    it("should fetch playlist when user signs in", () => {
      wrapper.setProps({
        auth: {
          signedIn: true,
          user: authedUser,
        },
      });
      expect(mockFetchPlaylist).toHaveBeenCalledWith(
        null,
        null,
        mockAccessToken
      );
    });
  });

  describe("When user is signed in and component is initially rendered", () => {
    beforeEach(() => {
      wrapper = shallow(
        <PlayList
          auth={{ signedIn: true, user: authedUser }}
          fetchPlaylist={mockFetchPlaylist}
          clearError={mockClearError}
        />
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render Banner and Menu component", () => {
      expect(wrapper.find(Banner).exists()).toBe(true);
      expect(wrapper.find(Menu).exists()).toBe(true);
    });

    it("should render Loading component", () => {
      expect(wrapper.find(Loading).exists()).toBe(true);
    });

    it("should call fetchChannels", () => {
      expect(mockFetchPlaylist).toHaveBeenCalled();
      expect(mockFetchPlaylist).toHaveBeenCalledWith(
        null,
        null,
        mockAccessToken
      );
    });
  });

  describe("When error occuers", () => {
    beforeEach(() => {
      wrapper = shallow(
        <PlayList
          auth={{ signedIn: true, user: authedUser }}
          fetchPlaylist={mockFetchPlaylist}
          clearError={mockClearError}
          error={playlistErrorResponse}
        />
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render ErrorMessage component", () => {
      expect(wrapper.find(ErrorMessage).exists()).toBe(true);
    });
  });

  describe("When playlist is fetched", () => {
    beforeEach(() => {
      wrapper = shallow(
        <PlayList
          auth={{ signedIn: true, user: authedUser }}
          fetchPlaylist={mockFetchPlaylist}
          clearError={mockClearError}
          error={null}
          playlist={playlistResponse}
        />
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });

    it("should render correct number of items", () => {
      expect(wrapper.find(PlayListItem)).toHaveLength(
        playlistResponse.items.length
      );
    });

    it("should render MoreButton component and respond to click", () => {
      const moreButton = wrapper.find(MoreButton);
      expect(moreButton.exists()).toBe(true);
      moreButton.prop("onClickMore")();
      expect(mockFetchPlaylist).toHaveBeenCalled();
      expect(mockFetchPlaylist).toHaveBeenCalledWith(
        playlistResponse.nextPageToken,
        null,
        mockAccessToken
      );
    });

    it("should render NoSignedIn component when user signs out", () => {
      wrapper.setProps({
        auth: { signedIn: false, user: null },
      });
      expect(wrapper.find(NoSignedIn).exists()).toBe(true);
    });
  });

  describe("When playlist fetched is empty", () => {
    beforeEach(() => {
      wrapper = shallow(
        <PlayList
          auth={{ signedIn: true, user: authedUser }}
          fetchPlaylist={mockFetchPlaylist}
          clearError={mockClearError}
          error={null}
          playlist={playlistEmptyResponse}
        />
      );
    });

    it("should render component", () => {
      expect(wrapper).toMatchSnapshot();
    });
    it("should display correct message", () => {
      expect(wrapper.find(ErrorMessage).exists()).toBe(true);
      expect(wrapper.find(ErrorMessage).prop("error")).toEqual({
        displayMessage: "No Playlist in this channel",
      });
      expect(wrapper.find(PlayListItem).exists()).toBe(false);
    });
  });
});
