import { AxiosResponse } from "axios";
import {
  ChannelResponse,
  Channel,
  SubscriptionResponse,
  Video,
  VideoSnippet,
} from "../types";
import { appAxios, logger, TIMELINE_THRESHOLD } from "../config";

export const processVideosData = (videos: VideoSnippet[]) => {
  return videos
    .filter((item) => !item.snippet.title.toLowerCase().includes("#short"))
    .map((item) => ({
      id: item.snippet.resourceId?.videoId as string,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      description: item.snippet.description,
      publishTimestamp: new Date(item.snippet.publishedAt).getTime(),
      imageUrl: item.snippet.thumbnails.high?.url || "",
      isActive: true,
    }));
};

export const fetchChannelProfile = async (
  channelId: string,
): Promise<{ channel?: Channel; error: string }> => {
  try {
    const response: AxiosResponse<ChannelResponse> = await appAxios.get(
      "/channels",
      {
        params: {
          id: channelId,
          part: "snippet,contentDetails",
        },
      },
    );
    return { channel: response.data.items[0], error: "" };
  } catch (err: any) {
    return { error: err.message };
  }
};

export const fetchSubscriptions = async (
  accessToken: string,
  options: { pageToken?: string } = {},
): Promise<{ subscriptions?: SubscriptionResponse; error: string }> => {
  try {
    const params: Record<string, string> = {
      part: "snippet",
      mine: "true",
      order: "alphabetical",
      maxResults: "50",
    };
    const { pageToken } = options;
    if (pageToken) params.pageToken = pageToken;
    const response: AxiosResponse<SubscriptionResponse> = await appAxios.get(
      "/subscriptions",
      {
        params,
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      },
    );
    return { subscriptions: response.data, error: "" };
  } catch (err: any) {
    logger.error("Error in fetching subscriptions", err.message);
    return { error: err.message };
  }
};

export const fetchSubscribedChannelIds = async (
  accessToken: string,
): Promise<string[]> => {
  let channelIds: string[] = [];
  let nextPageToken = "";

  do {
    const { subscriptions } = await fetchSubscriptions(accessToken, {
      pageToken: nextPageToken,
    });
    if (!subscriptions) continue;
    const items: string[] = (subscriptions.items || []).map(
      (item) => item.snippet.resourceId.channelId,
    );
    nextPageToken = subscriptions.nextPageToken || "";
    channelIds = [...channelIds, ...items];
  } while (!!nextPageToken);
  return channelIds;
};

export const fetchVideosInChannel = async ({
  channelId,
  maxResults = 20,
  publishedAfter = Date.now() - TIMELINE_THRESHOLD,
}: {
  channelId: string;
  maxResults?: number;
  publishedAfter?: number;
}): Promise<Video[]> => {
  const { channel } = await fetchChannelProfile(channelId);
  const uploadPlaylistId = channel?.contentDetails.relatedPlaylists?.uploads;
  if (!uploadPlaylistId) return [];
  try {
    const response = await appAxios.get("/playlistItems", {
      params: {
        playlistId: uploadPlaylistId,
        part: "snippet",
        maxResults,
      },
    });
    const videosData = processVideosData(response.data?.items || []);
    return videosData.filter((d) => d.publishTimestamp > publishedAfter);
  } catch (err) {
    return [];
  }
};
