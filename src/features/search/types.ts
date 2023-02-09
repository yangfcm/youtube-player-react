import { AsyncStatus } from "../../settings/types";
import { ChannelSnippet } from "../channel/types";
import { PlayListSnippet } from "../playlist/types";
import { VideoSnippet } from "../video/types";

export type ResultItemSnippet = VideoSnippet | ChannelSnippet | PlayListSnippet;

export interface SearchResultsResponse {
  etag: string;
  kind: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
  items: ResultItemSnippet[];
  nextPageToken?: string;
  prevPageToken?: string;
}

export interface SearchState {
  status: AsyncStatus;
  error?: string;
  results: SearchResultsResponse | null;
  relevantVideos: Record<string, SearchResultsResponse>;
  query: string;
}
