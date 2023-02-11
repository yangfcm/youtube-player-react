import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { useRegion } from "./useRegion";
import { fetchCategories } from "./settingSlice";
import { RootState } from "../../app/store";

export function useCategories() {
  const dispatch = useAppDispatch();
  const region = useRegion();
  const categories = useSelector(
    (state: RootState) => state.setting.categories
  );
  useEffect(() => {
    if (!categories && region) {
      dispatch(fetchCategories(region));
    }
  }, [dispatch, categories, region]);

  return {};
}
