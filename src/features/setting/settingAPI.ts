import { AxiosResponse } from "axios";
import { appAxios } from "../../settings/api";
import { PART_SNIPPET } from "../../settings/constant";
import { CategoriesResponse, RegionsResponse } from "./types";

export async function fetchRegionsAPI(): Promise<
  AxiosResponse<RegionsResponse>
> {
  return await appAxios.get("/i18nRegions");
}

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
