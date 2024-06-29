import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { lazy } from "react";
import ChannelVideos from "./pages/ChannelVideos";
import ChannelPlayLists from "./pages/ChannelPlayLists";
import ChannelProfile from "./pages/ChannelProfile";

const Subscriptions = lazy(() => import("./pages/Subscriptions"));
const SearchResults = lazy(() => import("./pages/SearchResults"));
const Video = lazy(() => import("./pages/Video"));
const PlayLists = lazy(() => import("./pages/PlayLists"));
const PlayListVideos = lazy(() => import("./pages/PlayListVideos"));
const Channel = lazy(() => import("./pages/Channel"));
const PopularVideos = lazy(() => import("./pages/PopularVideos"));

export function Router() {
  return (
    <Routes>
      <Route path="/subscriptions" element={<Subscriptions />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/playlist/:id" element={<PlayListVideos />} />
      <Route path="/playlists" element={<PlayLists />} />
      <Route path="/explore" element={<PopularVideos />} />
      <Route path="/video/:id" element={<Video />} />
      <Route path="/channel/:id" element={<Channel />}>
        <Route index element={<Navigate replace to="videos" />} />
        <Route path="videos" element={<ChannelVideos />} />
        <Route path="playlists" element={<ChannelPlayLists />} />
        <Route path="about" element={<ChannelProfile />} />
      </Route>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
