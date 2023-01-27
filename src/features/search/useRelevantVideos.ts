import { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { RootState } from "../../app/store";

export function useRelevantVideos(videoId: string) {
  const dispatch = useAppDispatch();
}
