import { AxiosResponse } from "axios";
import { appAxios } from "../../settings/api";
import { MAX_RESULTS_15, PART_SNIPPET } from "../../settings/constant";
import { SearchResultsResponse } from "./types";

export async function fetchSearchResultsAPI(
  options?: Record<string, string>
): Promise<AxiosResponse<SearchResultsResponse>> {
  return await appAxios.get("/search", {
    params: {
      part: PART_SNIPPET,
      maxResults: MAX_RESULTS_15,
      ...options,
    },
  });
}
