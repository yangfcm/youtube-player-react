import { useCategories } from "../features/setting/useCategories";

export function SettingProvider({ children }: { children: React.ReactNode }) {
  useCategories();
  return <>{children}</>;
}
