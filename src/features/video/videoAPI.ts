import { appAxios } from "../../settings/api";
import { MAX_RESULTS_15, PART_SNIPPET_STATS } from "../../settings/constant";

export async function fetchVideos(filter: any, pageToken: string) {
  return await appAxios.get("/videos", {
    params: {
      ...appAxios.defaults.params,
      ...filter,
      part: PART_SNIPPET_STATS,
      maxResults: MAX_RESULTS_15,
      pageToken,
    },
  });
}

export async function fetchVideo(videoId: string) {
  return await appAxios.get("/videos", {
    params: {
      ...appAxios.defaults.params,
      part: PART_SNIPPET_STATS,
      id: videoId,
    },
  });
}
