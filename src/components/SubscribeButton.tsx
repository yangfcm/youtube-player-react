import Button from "@mui/material/Button";
import { RequireAuth } from "./RequireAuth";

export function SubscribeButton() {
  return (
    <RequireAuth showLoginButton={false}>
      <Button variant="outlined" size="small">
        Subscribed
      </Button>
    </RequireAuth>
  );
}
