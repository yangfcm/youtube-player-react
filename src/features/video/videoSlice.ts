import { AsyncStatus } from "../../settings/types";
import { VideoSnippetStats } from "./types";
import { fetchVideo, fetchVideos } from "./videoAPI";

interface VideoState {
  videos: {
    status: AsyncStatus;
    items: VideoSnippetStats[];
  };
  video: {
    status: AsyncStatus;
    item: VideoSnippetStats | null;
  };
}

const initialState: VideoState = {
  videos: {
    status: AsyncStatus.IDLE,
    items: [],
  },
  video: {
    status: AsyncStatus.IDLE,
    item: null,
  },
};
