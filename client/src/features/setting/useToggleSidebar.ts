import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import {
  selOpenSidebar,
  setOpenSidebar as setOpenSidebarSetting,
} from "./settingSlice";

export function useToggleSidebar() {
  const dispatch = useAppDispatch();
  const openSidebar = useSelector(selOpenSidebar);
  const setOpenSidebar = (open: boolean) => {
    dispatch(setOpenSidebarSetting(open));
  };
  return { openSidebar, setOpenSidebar };
}
