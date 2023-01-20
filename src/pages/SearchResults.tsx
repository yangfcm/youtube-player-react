import { useSearchResults } from "../features/search/useSearchResults";

export function SearchResults() {
  const { searchResults, status, error, fetchMore, hasMore } =
    useSearchResults("shitou");
  console.log(searchResults, status, error);
  return <>Search results</>;
}
