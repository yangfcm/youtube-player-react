import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AsyncStatus } from "../../settings/types";
import { fetchCommentsAPI, fetchRepliesAPI } from "./commentAPI";
import { CommentResponse, ReplyResponse } from "./types";
import {
  DEFAULT_ERROR_MESSAGE,
  COMMENTS_TURNED_OFF_MESSAGE,
} from "../../settings/constant";

interface CommentState {
  comments: Record<
    string,
    {
      status: AsyncStatus;
      error: string;
      data: CommentResponse | null;
    }
  >;
  replies: Record<
    string,
    {
      status: AsyncStatus;
      error: string;
      data: ReplyResponse | null;
    }
  >;
}

const initialState: CommentState = {
  comments: {},
  replies: {},
};

export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async (args: { videoId: string; pageToken?: string }) => {
    const { videoId, pageToken } = args;
    const response = await fetchCommentsAPI(
      videoId,
      pageToken ? { pageToken } : {}
    );
    return response;
  }
);

export const fetchReplies = createAsyncThunk(
  "comment/fetchReplies",
  async (args: { commentId: string; pageToken?: string }) => {
    const { commentId, pageToken } = args;
    const response = await fetchRepliesAPI(
      commentId,
      pageToken ? { pageToken } : {}
    );
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
      { meta: { arg } }: { meta: { arg: { videoId: string } } }
    ) => {
      const { videoId } = arg;
      if (!videoId) return;
      if (!state.comments[arg.videoId]) {
        state.comments[arg.videoId] = {
          status: AsyncStatus.LOADING,
          error: "",
          data: null,
        };
      } else {
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
        meta: { arg: { videoId: string } };
      }
    ) => {
      const { videoId } = arg;
      if (!videoId) return;
      const currentItems = state.comments[videoId]?.data?.items || [];
      state.comments[videoId].status = AsyncStatus.SUCCESS;
      state.comments[videoId].error = "";
      state.comments[videoId].data = {
        ...payload.data,
        items: [...currentItems, ...payload.data.items],
      };
    };
    const fetchCommentsFailed = (
      state: CommentState,
      {
        error,
        meta: { arg },
      }: {
        error: SerializedError;
        meta: { arg: { videoId: string } };
      }
    ) => {
      const { videoId } = arg;
      if (!videoId) return;
      state.comments[videoId].status = AsyncStatus.FAIL;
      if (error.message && error.message.includes("disabled comments")) {
        state.comments[videoId].error = COMMENTS_TURNED_OFF_MESSAGE;
      } else {
        state.comments[videoId].error = error.message || DEFAULT_ERROR_MESSAGE;
      }
    };

    const fetchRepliesStart = (
      state: CommentState,
      { meta: { arg } }: { meta: { arg: { commentId: string } } }
    ) => {
      const { commentId } = arg;
      if (!commentId) return;
      if (!state.replies[commentId]) {
        state.replies[commentId] = {
          status: AsyncStatus.LOADING,
          error: "",
          data: null,
        };
      } else {
        state.replies[commentId].status = AsyncStatus.LOADING;
      }
    };

    const fetchRepliesSuccess = (
      state: CommentState,
      {
        payload,
        meta: { arg },
      }: {
        payload: AxiosResponse<ReplyResponse>;
        meta: { arg: { commentId: string } };
      }
    ) => {
      const { commentId } = arg;
      if (!commentId) return;
      const currentItems = state.replies[commentId]?.data?.items || [];
      state.replies[commentId].status = AsyncStatus.SUCCESS;
      state.replies[commentId].error = "";
      state.replies[commentId].data = {
        ...payload.data,
        items: [...currentItems, ...payload.data.items],
      };
    };

    const fetchRepliesFailed = (
      state: CommentState,
      {
        error,
        meta: { arg },
      }: { error: SerializedError; meta: { arg: { commentId: string } } }
    ) => {
      const { commentId } = arg;
      if (!commentId) return;
      state.comments[commentId].status = AsyncStatus.FAIL;
      state.comments[commentId].error = error.message || DEFAULT_ERROR_MESSAGE;
    };

    builder
      .addCase(fetchComments.pending, fetchCommentsStart)
      .addCase(fetchComments.fulfilled, fetchCommentsSuccess)
      .addCase(fetchComments.rejected, fetchCommentsFailed)
      .addCase(fetchReplies.pending, fetchRepliesStart)
      .addCase(fetchReplies.fulfilled, fetchRepliesSuccess)
      .addCase(fetchReplies.rejected, fetchRepliesFailed);
  },
});

export const commentReducer = commentSlice.reducer;
