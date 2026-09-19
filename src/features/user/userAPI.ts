import { AxiosResponse } from "axios";
import { doc, getDoc } from "firebase/firestore";
import { appAxios, googleAuthAxios } from "../../settings/api";
import {
  MAX_RESULTS_24,
  PART_SNIPPET_CONTENT_STATUS,
} from "../../settings/constant";
import { PlayListsResponse } from "../playlist/types";
import { UserInfoResponse, UserProfile } from "./types";
import { db } from "../../settings/firebaseConfig";

export async function fetchPlayListsAPI(
  options?: Record<string, string>
): Promise<AxiosResponse<PlayListsResponse>> {
  return await appAxios.get("/playlists", {
    params: {
      part: PART_SNIPPET_CONTENT_STATUS,
      mine: "true",
      maxResults: MAX_RESULTS_24,
      ...options,
    },
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
}

export async function fetchUserByTokenAPI(
  token: string
): Promise<AxiosResponse<UserInfoResponse>> {
  return await googleAuthAxios.get("/", {
    params: {
      access_token: token,
    },
  });
}

export async function fetchUserProfileAPI(
  userId: string,
): Promise<UserProfile | undefined> {
  const userSnap = await getDoc(doc(db, "users", userId));
  return userSnap.data() as UserProfile | undefined;
}
