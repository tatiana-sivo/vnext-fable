import { BrowserRouter, HashRouter, Navigate, Route, Routes } from "react-router-dom";
import Shell from "./components/Shell";
import Overview from "./screens/Overview";
import RetroClose from "./screens/RetroClose";
import WeeklyClose from "./screens/WeeklyClose";
import Delta from "./screens/Delta";
import BetDetail from "./screens/BetDetail";
import BidFlow from "./screens/BidFlow";
import Prosecutor from "./screens/Prosecutor";
import Coordination from "./screens/Coordination";
import Positions from "./screens/Positions";
import Incident from "./screens/Incident";

/** Hash routing for single-file/hosted-page builds (no history API on the host). */
const Router = import.meta.env.VITE_HASH_ROUTER ? HashRouter : BrowserRouter;

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Shell />}>
          <Route index element={<Overview />} />
          <Route path="/close/retro" element={<RetroClose />} />
          <Route path="/close/weekly" element={<WeeklyClose />} />
          <Route path="/delta" element={<Delta />} />
          <Route path="/bets/:betId" element={<BetDetail />} />
          <Route path="/plays/reengagement/bid" element={<BidFlow />} />
          <Route path="/prosecutor" element={<Prosecutor />} />
          <Route path="/coordination" element={<Coordination />} />
          <Route path="/positions" element={<Positions />} />
          <Route path="/incident" element={<Incident />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}
