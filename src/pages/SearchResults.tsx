import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { useSearchResults } from "../features/search/useSearchResults";
import { MoreButton } from "../components/MoreButton";
import { ErrorMessage } from "../components/ErrorMessage";
import { AsyncStatus } from "../settings/types";

export function SearchResults() {
  const location = useLocation();
  const query = location.search.substring(1);
  const vars = query.split("&");
  let q = "";
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (pair[0] === "q") {
      q = decodeURIComponent(pair[1]);
      break;
    }
  }
  const { searchResults, status, error, fetchMore, hasMore, queryChanged } =
    useSearchResults(q);

  if (
    (!searchResults?.length || queryChanged) &&
    status === AsyncStatus.LOADING
  ) {
    return <LoadingSpinner />;
  }

  return (
    <Box sx={{ pb: 2 }}>
      <ErrorMessage open={status === AsyncStatus.FAIL}>{error}</ErrorMessage>
      {searchResults &&
        searchResults.map((result) => {
          return <div>{result.snippet.title}</div>;
        })}
      {hasMore && (
        <MoreButton
          loading={status === AsyncStatus.LOADING}
          onClick={fetchMore}
        >
          More
        </MoreButton>
      )}
    </Box>
  );
}
