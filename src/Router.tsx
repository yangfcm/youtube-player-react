import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Subscriptions } from "./pages/Subscriptions";

export function Router() {
  return (
    <Routes>
      <Route path="/subscriptions" element={<Subscriptions />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
