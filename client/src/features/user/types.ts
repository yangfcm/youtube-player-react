import { AsyncStatus } from "../../settings/types";

export interface UserProfile {
  id: string;
  email: string;
  username: string;
  avatar: string;
  collections?: string[];
  subscriptions?: string[];
}

export interface UserState {
  profile: {
    status: AsyncStatus;
    error: string;
    data?: UserProfile;
  };
  isGoogleAuthEnabled: boolean;
}
