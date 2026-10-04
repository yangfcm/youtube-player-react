import { useRegion } from "../features/setting/useRegion";

export function RegionProvider({ children }: { children: React.ReactNode }) {
  useRegion();
  return <>{children}</>;
}
