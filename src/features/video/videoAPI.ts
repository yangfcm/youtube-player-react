import { AxiosResponse } from "axios";
import { appAxios, firebaseAxios } from "../../settings/api";
import { MAX_RESULTS_24, PART_SNIPPET_STATS } from "../../settings/constant";
import {
  VideoInfoResponse,
  VideoResponse,
  VideosResponse,
  DownloadParameter,
} from "./types";

export async function fetchVideosAPI(
  options: Record<string, string> = {}
): Promise<AxiosResponse<VideosResponse>> {
  return await appAxios.get("/videos", {
    params: {
      part: PART_SNIPPET_STATS,
      maxResults: MAX_RESULTS_24 / 2,
      ...options,
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

export async function fetchVideoInfoAPI(
  videoId: string
): Promise<AxiosResponse<VideoInfoResponse>> {
  return await firebaseAxios.get(`/videoinfo/${videoId}`);
}

export async function downloadVideoAPI({
  videoId,
  userId,
  title,
  filter = "videoandaudio",
  cancelToken,
}: DownloadParameter): Promise<AxiosResponse<unknown>> {
  // The endpoint triggers downloading in the background. We don't really care what it returns.
  return await firebaseAxios.post(
    `/download/`,
    {
      videoId,
      userId,
      title,
      filter,
    },
    { cancelToken }
  );
}
