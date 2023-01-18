import { AxiosResponse } from "axios";
import { appAxios } from "../../settings/api";
import { MAX_RESULTS_15, PART_SNIPPET_STATS } from "../../settings/constant";
import { VideoResponse } from "./types";

export async function fetchVideosAPI(filter: Record<string, string> = {}) {
  return await appAxios.get("/videos", {
    params: {
      part: PART_SNIPPET_STATS,
      maxResults: MAX_RESULTS_15,
      ...filter,
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
