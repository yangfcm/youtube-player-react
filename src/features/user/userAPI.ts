import { AxiosResponse } from "axios";
import { appAxios } from "../../settings/api";
import { MAX_RESULTS_24, PART_SNIPPET } from "../../settings/constant";
import { SubscriptionsResponse } from "./types";

export async function fetchSubscriptionsAPI(): Promise<
  AxiosResponse<SubscriptionsResponse>
> {
  return await appAxios.get("/subscriptions", {
    params: {
      part: PART_SNIPPET,
      mine: "true",
      order: "alphabetical",
    },
  });
}
