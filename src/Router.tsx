import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Subscriptions } from "./pages/Subscriptions";
import { SearchResults } from "./pages/SearchResults";
import { Video } from "./pages/Video";
import { PlayList } from "./pages/PlayList";

export function Router() {
  return (
    <Routes>
      <Route path="/subscriptions" element={<Subscriptions />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/playlist" element={<PlayList />} />
      <Route path="/video/:id" element={<Video />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
