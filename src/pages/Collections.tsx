import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { RequireAuth } from "../components/RequireAuth";
import { RequireLoginPage } from "../components/RequireLoginPage";
import { useCollections } from "../features/collection/useCollections";
import { ErrorMessage } from "../components/ErrorMessage";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { AsyncStatus } from "../settings/types";
import { CollectionCard } from "../components/CollectionCard";
import { NoContent } from "../components/NoContent";

export default function Collections() {
  const { collections, status, error } = useCollections();

  return (
    <RequireAuth unAuthedComponent={<RequireLoginPage />}>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      <Typography variant="h5" sx={{ mb: 2 }}>
        My Collections
      </Typography>
      {status === AsyncStatus.LOADING && collections.length === 0 && (
        <LoadingSpinner />
      )}
      {status === AsyncStatus.SUCCESS && collections.length === 0 && (
        <NoContent>You haven't created any collection.</NoContent>
      )}
      <Box sx={{ pb: 2 }}>
        <Grid container spacing={2} sx={{ pb: 2 }}>
          {collections.map((collection) => (
            <Grid item xs={6} sm={3} lg={2} key={collection.id}>
              <CollectionCard collection={collection} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </RequireAuth>
  );
}
