import { AxiosResponse } from "axios";
import { appAxios } from "../../settings/api";
import {
  MAX_RESULTS_24,
  PART_SNIPPET_CONTENT_STATUS,
} from "../../settings/constant";
import { PlayListItemsResponse } from "./types";

export async function fetchPlaylistVideosAPI(
  playlistId: string,
  options: Record<string, string> = {}
): Promise<AxiosResponse<PlayListItemsResponse>> {
  return await appAxios.get("/playlistItems", {
    params: {
      playlistId,
      part: PART_SNIPPET_CONTENT_STATUS,
      maxResults: MAX_RESULTS_24,
      ...options,
    },
  });
}
