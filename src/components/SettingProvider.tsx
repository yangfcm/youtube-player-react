import { useCategories } from "../features/setting/useCategories";
import { useLocation } from "../features/setting/useLocation";

export function SettingProvider({ children }: { children: React.ReactNode }) {
  useCategories();
  useLocation();
  return <>{children}</>;
}
