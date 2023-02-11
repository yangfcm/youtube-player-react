import { useCategories } from "../features/setting/useCategories";
import { useRegion } from "../features/setting/useRegion";

export function SettingProvider({ children }: { children: React.ReactNode }) {
  useRegion();
  useCategories();
  return <>{children}</>;
}
