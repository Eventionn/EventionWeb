import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Overview from "./pages/Dashboard/Overview";
import EventsOverview from "./pages/Events/Overview";
import ApproveEvents from "./pages/Events/Approve";
import UsersOverview from "./pages/UsersOverview/UsersOverview";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>

          <Route element={<AppLayout />}>
            <Route index path="/" element={<Overview />} />
            <Route path="/events" element={<EventsOverview />} />
            <Route path="/approve" element={<ApproveEvents />} />
            <Route path="/users" element={<UsersOverview />} />
            <Route path="/profile" element={<UserProfiles />} />
          </Route>

          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
