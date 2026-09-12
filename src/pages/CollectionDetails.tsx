import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { RequireAuth } from "../components/RequireAuth";
import { RequireLoginPage } from "../components/RequireLoginPage";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { NoContent } from "../components/NoContent";
import { useCollection } from "../features/collection/useCollection";
import { AsyncStatus } from "../settings/types";

export default function CollectionDetails() {
  const { id = "" } = useParams();
  const { collection, status, error } = useCollection(id);

  return (
    <RequireAuth unAuthedComponent={<RequireLoginPage />}>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Collection Details
      </Typography>
      {status === AsyncStatus.LOADING && <LoadingSpinner />}
      {status === AsyncStatus.SUCCESS && !collection && (
        <NoContent>Collection is unavailable</NoContent>
      )}
      {status === AsyncStatus.SUCCESS &&
        collection &&
        collection.items.length === 0 && (
          <NoContent>No items in the collection</NoContent>
        )}
      {status === AsyncStatus.SUCCESS &&
        collection &&
        collection.items.length > 0 && (
          <Typography component="pre">
            {JSON.stringify(collection, null, 2)}
          </Typography>
        )}
    </RequireAuth>
  );
}
