import { AxiosResponse } from "axios";
import { appAxios } from "../../settings/api";
import { MAX_RESULTS_15, PART_SNIPPET_STATS } from "../../settings/constant";
import { VideoResponse } from "./types";

export async function fetchVideosAPI(filter: any, pageToken: string) {
  return await appAxios.get("/videos", {
    params: {
      ...filter,
      part: PART_SNIPPET_STATS,
      maxResults: MAX_RESULTS_15,
      pageToken,
    },
  });
}

export async function fetchVideoAPI(
  videoId: string
): Promise<AxiosResponse<VideoResponse>> {
  return await appAxios.get("/videos", {
    params: {
      part: PART_SNIPPET_STATS,
      id: videoId,
    },
  });
}
