import {
  createAsyncThunk,
  createSlice,
  SerializedError,
  PayloadAction,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AsyncStatus } from "../../settings/types";
import {
  fetchCommentsAPI,
  fetchRepliesAPI,
  postVideoCommentAPI,
} from "./commentAPI";
import {
  CommentResponse,
  ReplyResponse,
  CommentOrder,
  CommentSnippet,
} from "./types";
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
      // data: CommentResponse | null;
      data: {
        relevance?: CommentResponse;
        time?: CommentResponse;
      };
      order: CommentOrder;
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
  postStatus: AsyncStatus;
  postError: string;
}

const initialState: CommentState = {
  comments: {},
  replies: {},
  postStatus: AsyncStatus.IDLE,
  postError: "",
};

export const fetchComments = createAsyncThunk(
  "comment/fetchComments",
  async (args: {
    videoId: string;
    pageToken?: string;
    order?: CommentOrder;
  }) => {
    const { videoId, pageToken, order = "relevance" } = args;
    const response = await fetchCommentsAPI(
      videoId,
      pageToken ? { pageToken, order } : { order }
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

export const postVideoComment = createAsyncThunk(
  "comment/postVideoComment",
  async (args: { videoId: string; comment: string }) => {
    const response = await postVideoCommentAPI(args);
    return response;
  }
);

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setCommentOrder: (
      state,
      action: PayloadAction<{
        videoId: string;
        order: CommentOrder;
      }>
    ) => {
      const { videoId, order } = action.payload;
      if (state.comments[videoId]) {
        state.comments[videoId].order = order;
      }
    },
  },
  extraReducers: (builder) => {
    const fetchCommentsStart = (
      state: CommentState,
      {
        meta: { arg },
      }: { meta: { arg: { videoId: string; order?: CommentOrder } } }
    ) => {
      const { videoId, order = "relevance" } = arg;
      if (!videoId) return;
      if (!state.comments[arg.videoId]?.data) {
        state.comments[arg.videoId] = {
          status: AsyncStatus.LOADING,
          error: "",
          data: {
            [order]: undefined,
          },
          order,
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
        meta: { arg: { videoId: string; order?: CommentOrder } };
      }
    ) => {
      const { videoId, order = "relevance" } = arg;
      if (!videoId) return;
      const currentItems = state.comments[videoId]?.data[order]?.items || [];
      state.comments[videoId].status = AsyncStatus.SUCCESS;
      state.comments[videoId].error = "";
      state.comments[videoId].data[order] = {
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
        meta: { arg: { videoId: string; order?: CommentOrder } };
      }
    ) => {
      const { videoId, order = "relevance" } = arg;
      if (!videoId) return;
      state.comments[videoId].status = AsyncStatus.FAIL;
      if (error.message && error.message.includes("disabled comments")) {
        state.comments[videoId].error = COMMENTS_TURNED_OFF_MESSAGE;
        state.comments[videoId].data[order] = undefined;
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

    const postVideoCommentStart = (state: CommentState) => {
      state.postStatus = AsyncStatus.LOADING;
    };

    const postVideoCommentSuccess = (
      state: CommentState,
      {
        payload,
        meta: { arg },
      }: {
        payload: AxiosResponse<CommentSnippet>;
        meta: { arg: { videoId: string } };
      }
    ) => {
      const { videoId } = arg;
      const addedComment = payload.data;
      const order = state.comments[videoId].order || "relevance";
      const currentItems = state.comments[videoId].data[order]?.items || [];
      state.postStatus = AsyncStatus.SUCCESS;
      state.postError = "";
      if (state.comments[videoId].data[order]) {
        state.comments[videoId].data[order]!.items = [
          addedComment,
          ...currentItems,
        ];
      }
    };

    const postVideoCommentFailed = (
      state: CommentState,
      { error }: { error: SerializedError }
    ) => {
      state.postStatus = AsyncStatus.FAIL;
      state.postError = error.message || DEFAULT_ERROR_MESSAGE;
    };

    builder
      .addCase(fetchComments.pending, fetchCommentsStart)
      .addCase(fetchComments.fulfilled, fetchCommentsSuccess)
      .addCase(fetchComments.rejected, fetchCommentsFailed)
      .addCase(fetchReplies.pending, fetchRepliesStart)
      .addCase(fetchReplies.fulfilled, fetchRepliesSuccess)
      .addCase(fetchReplies.rejected, fetchRepliesFailed)
      .addCase(postVideoComment.pending, postVideoCommentStart)
      .addCase(postVideoComment.fulfilled, postVideoCommentSuccess)
      .addCase(postVideoComment.rejected, postVideoCommentFailed);
  },
});

export const { setCommentOrder } = commentSlice.actions;

export const commentReducer = commentSlice.reducer;
