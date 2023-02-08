import { AxiosResponse } from "axios";
import { appAxios } from "../../settings/api";
import { MAX_RESULTS_15, PART_SNIPPET } from "../../settings/constant";
import {
  CommentResponse,
  ReplyResponse,
  VideoCommentRequestBody,
} from "./types";

export async function fetchCommentsAPI(
  videoId: string,
  options: Record<string, string> = {}
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
  options: Record<string, string> = {}
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

export async function postVideoCommentAPI({
  channelId,
  videoId,
  comment,
}: {
  channelId: string;
  videoId: string;
  comment: string;
}): Promise<AxiosResponse<any>> {
  const requestBody: VideoCommentRequestBody = {
    snippet: {
      channelId,
      videoId,
      topLevelComment: {
        snippet: {
          textOriginal: comment,
        },
      },
    },
  };
  return await appAxios.post("/commentThreads", requestBody, {
    params: {
      part: PART_SNIPPET,
    },
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
}
