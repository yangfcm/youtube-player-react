import { AxiosResponse } from "axios";
import { appAxios } from "../../settings/api";
import { PART_SNIPPET_STATS } from "../../settings/constant";
import { ChannelDetailsResponse } from "./types";

export async function fetchChannelProfileAPI(
  channelId: string
): Promise<AxiosResponse<ChannelDetailsResponse>> {
  return await appAxios.get("/channels", {
    params: {
      part: PART_SNIPPET_STATS,
      id: channelId,
    },
  });
}

export async function fetchChannelVideosAPI() {}

export async function fetchChannelPlaylistsAPI() {}
