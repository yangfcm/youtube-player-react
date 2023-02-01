import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { RequireAuth } from "../components/RequireAuth";
import { useSubscriptions } from "../features/user/useSubscriptions";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AsyncStatus } from "../settings/types";

export function Subscriptions() {
  const { subscriptions, status, error } = useSubscriptions();
  if (status === AsyncStatus.LOADING) return <LoadingSpinner />;
  return (
    <RequireAuth>
      <Box>
        <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      </Box>
    </RequireAuth>
  );
}
