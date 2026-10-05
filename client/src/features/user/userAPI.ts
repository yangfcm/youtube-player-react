import { AxiosResponse } from "axios";
import { doc, getDoc } from "firebase/firestore";
import { googleAuthAxios } from "../../settings/api";
import { UserInfoResponse, UserProfile } from "./types";
import { db } from "../../settings/firebaseConfig";

export async function fetchUserByTokenAPI(
  token: string,
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
