import { useRegion } from "../features/setting/useRegion";

export function SettingProvider({ children }: { children: React.ReactNode }) {
  useRegion();
  return <>{children}</>;
}
