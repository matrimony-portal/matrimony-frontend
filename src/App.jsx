// src/App.jsx
import { Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import DashboardRouter from "./components/auth/DashboardRouter.jsx";

// Public Pages
import HomePage from "./components/HomePage";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import ForgotPassword from "./components/ForgotPassword";

// Layout
import Layout from "./components/common/Layout/Layout.jsx";

// Dashboard Pages
import FreeUserDashboard from "./components/dashboard/free/FreeUserDashboard.jsx";
import PremiumUserDashboard from "./components/dashboard/premium/PremiumUserDashboard.jsx";
import MyProfile from "./components/dashboard/premium/MyProfile.jsx";
import EditProfile from "./components/dashboard/premium/EditProfile.jsx";
import ManagePhotos from "./components/dashboard/premium/ManagePhotos.jsx";
import SearchMatches from "./components/dashboard/premium/SearchMatches.jsx";
import Proposals from "./components/dashboard/premium/Proposals.jsx";
import Messages from "./components/dashboard/premium/Messages.jsx";
import Shortlist from "./components/dashboard/premium/Shortlist.jsx";
import BlockedUsers from "./components/dashboard/premium/BlockedUsers.jsx";
import Events from "./components/dashboard/premium/Events.jsx";
import Settings from "./components/dashboard/premium/Settings.jsx";
import Feedback from "./components/dashboard/premium/Feedback.jsx";
import ProfileView from "./components/dashboard/premium/ProfileView.jsx";
import OrganizerDashboard from "./components/dashboard/organizer/OrganizerDashboard.jsx";
import AdminDashboard from "./components/dashboard/admin/AdminDashboard.jsx";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/custom.css";
import BroadcastMessage from "./components/dashboard/admin/BroadcastMessage.jsx";
import AddEvent from "./components/dashboard/admin/AddEvent.jsx";
import GlobalAnnouncement from "./components/dashboard/admin/GlobalAnnouncement.jsx";
import ReportsCounter from "./components/dashboard/admin/ReportsCounter.jsx";
import SuccessStories from "./components/dashboard/admin/SuccessStories.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Protected Dashboard Routes with Layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoutes={["user", "organizer", "admin"]}>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Main Dashboard Route */}
          <Route index element={<DashboardRouter />} />

          {/* Free User Route */}
          <Route path="free" element={<FreeUserDashboard />} />

          {/* Premium User Routes */}
          <Route path="premium" element={<PremiumUserDashboard />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="edit-profile" element={<EditProfile />} />
          <Route path="manage-photos" element={<ManagePhotos />} />
          <Route path="search" element={<SearchMatches />} />
          <Route path="proposals" element={<Proposals />} />
          <Route path="messages" element={<Messages />} />
          <Route path="shortlist" element={<Shortlist />} />
          <Route path="blocked-users" element={<BlockedUsers />} />
          <Route path="events" element={<Events />} />
          <Route path="settings" element={<Settings />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="profile/:id" element={<ProfileView />} />

          {/* Organizer Routes */}
          <Route path="organizer" element={<OrganizerDashboard />} />

          {/*Admin Routes */}

          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/broadcast" element={<BroadcastMessage />} />
          <Route path="admin/add-event" element={<AddEvent />} />
          <Route path="admin/announcement" element={<GlobalAnnouncement />} />
          <Route path="admin/reports" element={<ReportsCounter />} />
          <Route path="admin/success-stories" element={<SuccessStories />} />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;
