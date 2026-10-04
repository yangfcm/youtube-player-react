import { AxiosResponse } from "axios";
import { appAxios, locationAxios } from "../../settings/api";
import { PART_SNIPPET } from "../../settings/constant";
import { CategoriesResponse, LocationResponse } from "./types";

export async function fetchVideoCategoriesAPI(
  regionCode: string
): Promise<AxiosResponse<CategoriesResponse>> {
  return await appAxios.get("/videoCategories", {
    params: {
      part: PART_SNIPPET,
      regionCode,
    },
  });
}

export async function fetchLocationAPI(): Promise<
  AxiosResponse<LocationResponse>
> {
  return await locationAxios.get("");
}
