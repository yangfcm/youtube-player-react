import { useSelector } from "react-redux";
import { selProfile } from "./userSlice";

export function useProfile() {
  const profile = useSelector(selProfile);
  return profile;
}
