import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { fetchCategories } from "./settingSlice";
import { RootState } from "../../app/store";

export function useCategories() {
  const dispatch = useAppDispatch();
  const region = useSelector((state: RootState) => state.setting.location);
  const categories = useSelector(
    (state: RootState) => state.setting.categories?.items
  );

  useEffect(() => {
    if (!categories && region) {
      dispatch(fetchCategories(region));
    }
  }, [dispatch, categories, region]);

  return categories;
}
