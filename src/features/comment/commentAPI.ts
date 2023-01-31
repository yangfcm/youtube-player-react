import { AxiosResponse } from "axios";
import { appAxios } from "../../settings/api";
import { MAX_RESULTS_15, PART_SNIPPET } from "../../settings/constant";
import { CommentResponse, ReplyResponse } from "./types";

export async function fetchCommentsAPI(
  videoId: string,
  options?: Record<string, string>
): Promise<AxiosResponse<CommentResponse>> {
  return await appAxios.get("/commentThreads", {
    params: {
      videoId,
      part: PART_SNIPPET,
      maxResults: MAX_RESULTS_15,
      order: "relevance",
      ...options,
    },
  });
}

export async function fetchRepliesAPI(
  commentId: string,
  options?: Record<string, string>
): Promise<AxiosResponse<ReplyResponse>> {
  return await appAxios.get("/comments", {
    params: {
      parentId: commentId,
      part: PART_SNIPPET,
      maxResults: MAX_RESULTS_15,
      ...options,
    },
  });
}
