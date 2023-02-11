import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { fetchLocation } from "./settingSlice";
import { RootState } from "../../app/store";

export function useLocation() {
  const dispatch = useAppDispatch();
  const location = useSelector((state: RootState) => state.setting.location);

  useEffect(() => {
    if (!location) {
      dispatch(fetchLocation());
    }
  }, [dispatch, location]);

  return location;
}
