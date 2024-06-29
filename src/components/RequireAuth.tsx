import { useAuth } from "../features/user/useAuth";

export function RequireAuth({
  children,
  unAuthedComponent: UnAuthedComponent,
}: {
  children: React.ReactNode;
  unAuthedComponent?: React.ReactNode;
}) {
  const { isSignedIn } = useAuth();

  if (!isSignedIn) {
    return UnAuthedComponent ? <>{UnAuthedComponent}</> : null;
  }

  return <>{children}</>;
}
