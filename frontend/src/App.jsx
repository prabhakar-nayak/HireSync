import { BrowserRouter, Routes, Route } from "react-router-dom";

import PanelistAvailability from "./pages/PanelistAvailability";
import CandidateAvailability from "./pages/CandidateAvailability";
import MatchingSlots from "./pages/MatchingSlots";
import InterviewScheduler from "./pages/InterviewScheduler";
import UpcomingInterviews from "./pages/UpcomingInterviews";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="container mt-4">
        <h1 className="mb-4">HireSync Dashboard</h1>

        <Navbar />
        {/* ROUTES */}

        <Routes>
          <Route path="/" element={<PanelistAvailability />} />

          <Route path="/candidate" element={<CandidateAvailability />} />

          <Route path="/matches" element={<MatchingSlots />} />

          <Route path="/schedule" element={<InterviewScheduler />} />

          <Route path="/upcoming" element={<UpcomingInterviews />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
