import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { fetchRegions } from "./settingSlice";

export function useRegions() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchRegions());
  }, []);

  return {};
}
