import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Dashboard } from "./components/Dashboard";
import { RealtimeData } from "./components/RealtimeData";
import { MaintenanceTips } from "./components/MaintenanceTips";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/realtime" element={<RealtimeData />} />
          <Route
            path="/maintenance"
            element={<MaintenanceTips />}
          />
        </Routes>
      </div>
    </Router>
  );
}