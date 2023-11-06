import { AxiosResponse } from "axios";
import { appAxios } from "../../settings/api";
import {
  MAX_RESULTS_24,
  PART_SNIPPET,
  PART_SNIPPET_CONTENT_STATUS,
  PART_SNIPPET_CONTENT_STATS_BRANDING,
} from "../../settings/constant";
import { PlayListsResponse } from "../playlist/types";
import { VideosSnippetResponse } from "../video/types";
import { ChannelDetailsResponse } from "./types";

export async function fetchChannelProfileAPI(
  channelId: string
): Promise<AxiosResponse<ChannelDetailsResponse>> {
  return await appAxios.get("/channels", {
    params: {
      id: channelId,
      part: PART_SNIPPET_CONTENT_STATS_BRANDING,
    },
  });
}

export async function fetchChannelVideosAPI(
  channelId: string,
  options: Record<string, string> = {}
): Promise<AxiosResponse<VideosSnippetResponse>> {
  return await appAxios.get("/search", {
    params: {
      channelId,
      part: PART_SNIPPET,
      order: "date",
      type: "video",
      maxResults: MAX_RESULTS_24,
      ...options,
    },
  });
}

export async function fetchChannelPlaylistsAPI(
  channelId: string,
  options: Record<string, string> = {}
): Promise<AxiosResponse<PlayListsResponse>> {
  return await appAxios.get("/playlists", {
    params: {
      channelId,
      maxResults: MAX_RESULTS_24,
      part: PART_SNIPPET_CONTENT_STATUS,
      ...options,
    },
  });
}
