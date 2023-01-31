import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AsyncStatus } from "../../settings/types";
import { fetchCommentsAPI, fetchRepliesAPI } from "./commentAPI";
import { CommentResponse, ReplyResponse } from "./types";

interface CommentState {
  comments: Record<
    string,
    {
      status: AsyncStatus;
      error: string;
      data: CommentResponse;
    }
  >;
  replies: Record<
    string,
    {
      status: AsyncStatus;
      error: string;
      data: ReplyResponse;
    }
  >;
}

const initialState: CommentState = {
  comments: {},
  replies: {},
};

export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async (args: { videoId: string; [key: string]: string }) => {
    const { videoId, ...options } = args;
    const response = await fetchCommentsAPI(videoId, options);
    return response;
  }
);

export const fetchReplies = createAsyncThunk(
  "comment/fetchReplies",
  async (args: { commentId: string; [key: string]: string }) => {
    const { commentId, ...options } = args;
    const response = await fetchRepliesAPI(commentId, options);
    return response;
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const fetchCommentsStart = (
      state: CommentState,
      {
        meta: { arg },
      }: { meta: { arg: { videoId: string; [key: string]: string } } }
    ) => {
      if (arg.videoId) {
        state.comments[arg.videoId].status = AsyncStatus.LOADING;
      }
    };
    const fetchCommentsSuccess = (
      state: CommentState,
      {
        payload,
        meta: { arg },
      }: {
        payload: AxiosResponse<CommentResponse>;
        meta: { arg: { videoId: string; [key: string]: string } };
      }
    ) => {
      const { videoId } = arg;
      if (!videoId) return;
      const { etag, items, kind, nextPageToken, pageInfo } = payload.data;
      const currentItems = state.comments[videoId]?.data?.items || [];
      state.comments[videoId].status = AsyncStatus.SUCCESS;
      state.comments[videoId].error = "";
      state.comments[videoId].data = {
        etag,
        kind,
        nextPageToken,
        pageInfo,
        items: [...currentItems, ...items],
      };
    };
    const fetchCommentsFailed = (
      state: CommentState,
      {
        error,
        meta: { arg },
      }: {
        error: SerializedError;
        meta: { arg: { videoId: string; [key: string]: string } };
      }
    ) => {
      const { videoId } = arg;
      if (!videoId) return;
      state.comments[videoId].status = AsyncStatus.FAIL;
      state.comments[videoId].error = error.message || "";
    };

    builder
      .addCase(fetchComments.pending, fetchCommentsStart)
      .addCase(fetchComments.fulfilled, fetchCommentsSuccess)
      .addCase(fetchComments.rejected, fetchCommentsFailed);
  },
});

export const commentReducer = commentSlice.reducer;
