import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { useLocation } from "./useLocation";
import { fetchCategories } from "./settingSlice";
import { RootState } from "../../app/store";

export function useCategories() {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const categories = useSelector(
    (state: RootState) => state.setting.categories
  );
  useEffect(() => {
    if (!categories && location) {
      dispatch(fetchCategories(location));
    }
  }, [dispatch, categories, location]);

  return {};
}
