import { useCategories } from "../features/setting/useCategories";
import { useRegions } from "../features/setting/useRegions";

export function SettingProvider({ children }: { children: React.ReactNode }) {
  useCategories();
  // useRegions();
  return <>{children}</>;
}
