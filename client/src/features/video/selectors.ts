import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export const getVideoById = createSelector(
  (state: RootState) => state,
  (state: RootState, videoId: string) => videoId,
  (state: RootState, videoId: string) => state.video.video.item[videoId]
);
