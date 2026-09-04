import { AsyncStatus } from "../../settings/types";
import { PlayListsResponse } from "../playlist/types";

export interface UserInfoResponse {
  email: string;
  email_verified: boolean;
  family_name: string;
  given_name: string;
  locale: string;
  name: string;
  picture: string;
  sub: string;
}

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  lastName: string;
  firstName: string;
  avatar: string;
}

export interface UserState {
  profile: {
    status: AsyncStatus;
    error: string;
    data?: UserProfile;
  };
  token: string;
  expiresAt: number;
  playlists: {
    status: AsyncStatus;
    error: string;
    data?: PlayListsResponse;
  };
  isGoogleAuthEnabled: boolean;
}
