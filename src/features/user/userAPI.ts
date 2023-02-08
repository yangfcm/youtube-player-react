import { AxiosResponse } from "axios";
import { appAxios } from "../../settings/api";
import {
  MAX_RESULTS_24,
  PART_SNIPPET,
  PART_SNIPPET_CONTENT_STATUS,
} from "../../settings/constant";
import { PlayListsResponse } from "../playlist/types";
import { SubscriptionsResponse } from "./types";

export async function fetchSubscriptionsAPI(
  options?: Record<string, string>
): Promise<AxiosResponse<SubscriptionsResponse>> {
  return await appAxios.get("/subscriptions", {
    params: {
      part: PART_SNIPPET,
      mine: "true",
      order: "alphabetical",
      maxResults: MAX_RESULTS_24 * 2,
      ...options,
    },
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
}

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

export async function subscribeAPI(
  channelId: string
): Promise<AxiosResponse<any>> {
  return await appAxios.post(
    "/subscriptions",
    {
      snippet: {
        resourceId: {
          kind: "youtube#channel",
          channelId,
        },
      },
    },
    {
      headers: { Authorization: localStorage.getItem("token") },
      params: {
        part: PART_SNIPPET,
      },
    }
  );
}

export async function unsubscribeAPI(channelId: string): Promise<string> {
  const subscriptionRes = await appAxios.get("/subscriptions", {
    params: {
      part: PART_SNIPPET,
      forChannelId: channelId,
      mine: true,
    },
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  const subscriptionId = subscriptionRes.data.items[0].id; // Get subscription id.
  await appAxios.delete("/subscriptions", {
    params: {
      id: subscriptionId,
    },
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return channelId;
}
