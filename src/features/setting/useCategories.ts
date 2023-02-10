import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { fetchCategories } from "./settingSlice";
import { RootState } from "../../app/store";

export function useCategories() {
  const dispatch = useAppDispatch();
  const categories = useSelector(
    (state: RootState) => state.setting.categories
  );
  useEffect(() => {
    if (!categories) {
      dispatch(fetchCategories("au"));
    }
  }, [dispatch, categories]);

  return {};
}
