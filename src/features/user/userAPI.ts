import { AxiosResponse } from "axios";
import { appAxios } from "../../settings/api";
import {
  MAX_RESULTS_24,
  PART_SNIPPET,
  PART_SNIPPET_CONTENT_STATUS,
} from "../../settings/constant";
import { PlayListsResponse } from "../playlist/types";
import { SubscriptionSnippet, SubscriptionsResponse } from "./types";

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

export async function subscribeChannelAPI(
  channelId: string
): Promise<AxiosResponse<SubscriptionSnippet>> {
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

export async function fetchSubscriptionIdAPI(
  channelId: string
): Promise<AxiosResponse<SubscriptionsResponse>> {
  return await appAxios.get("/subscriptions", {
    params: {
      part: PART_SNIPPET,
      forChannelId: channelId,
      mine: true,
    },
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
}

export async function unsubscribeChannelAPI(
  subscriptionId: string
): Promise<string> {
  await appAxios.delete("/subscriptions", {
    params: {
      id: subscriptionId,
    },
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  return subscriptionId;
}
