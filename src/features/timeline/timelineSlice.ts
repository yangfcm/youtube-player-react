import { AsyncStatus } from "../../settings/types";
import { TimelineState } from "./types";

const initialState: TimelineState = {
  videos: [],
  status: AsyncStatus.IDLE,
  error: "",
};
