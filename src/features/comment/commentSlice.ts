import {
  createAsyncThunk,
  createSlice,
  SerializedError,
} from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { AsyncStatus } from "../../settings/types";
import { CommentResponse, ReplyResponse, ReplySnippet } from "./types";

interface CommentState {
  comments: Record<
    string,
    {
      status: AsyncStatus;
      error: SerializedError | null;
      data: CommentResponse;
    }
  >;
  replies: Record<
    string,
    {
      status: AsyncStatus;
      error: SerializedError | null;
      data: ReplyResponse;
    }
  >;
}

const initialState: CommentState = {
  comments: {},
  replies: {},
};
