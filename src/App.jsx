// src/App.jsx
import { Routes, Route, Navigate } from "react-router";
import { AuthProvider } from "./providers/AuthProvider.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import DashboardRouter from "./components/auth/DashboardRouter.jsx";
import DashboardPathRouter from "./components/auth/DashboardPathRouter.jsx";

// Public Pages
import HomePage from "./components/HomePage";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import ForgotPassword from "./components/ForgotPassword";
import UpgradePage from "./components/upgrade/UpgradePage.jsx";

// Layout
import Layout from "./components/common/Layout/Layout.jsx";

// Dashboard Pages (Free)
import FreeUserDashboard from "./components/dashboard/free/FreeUserDashboard.jsx";
import FreeEditProfile from "./components/dashboard/free/EditProfile.jsx";
import FreeManagePhotos from "./components/dashboard/free/ManagePhotos.jsx";
import FreeManageProfile from "./components/dashboard/free/ManageProfile.jsx";
import FreeSearchMatches from "./components/dashboard/free/SearchMatches.jsx";
import FreeProposals from "./components/dashboard/free/Proposals.jsx";
import FreeMessages from "./components/dashboard/free/Messages.jsx";
import FreeShortlist from "./components/dashboard/free/Shortlist.jsx";
import FreeBlockedUsers from "./components/dashboard/free/BlockedUsers.jsx";
import FreeEvents from "./components/dashboard/free/Events.jsx";
import FreeSettings from "./components/dashboard/free/Settings.jsx";
import FreeFeedback from "./components/dashboard/free/Feedback.jsx";
import FreeProfileView from "./components/dashboard/free/ProfileView.jsx";

// Dashboard Pages (Premium)
import PremiumUserDashboard from "./components/dashboard/premium/PremiumUserDashboard.jsx";
import MyProfile from "./components/dashboard/premium/MyProfile.jsx";
import PremiumEditProfile from "./components/dashboard/premium/EditProfile.jsx";
import PremiumManagePhotos from "./components/dashboard/premium/ManagePhotos.jsx";
import PremiumManageProfile from "./components/dashboard/premium/ManageProfile.jsx";
import PremiumSearchMatches from "./components/dashboard/premium/SearchMatches.jsx";
import PremiumProposals from "./components/dashboard/premium/Proposals.jsx";
import PremiumMessages from "./components/dashboard/premium/Messages.jsx";
import PremiumShortlist from "./components/dashboard/premium/Shortlist.jsx";
import PremiumBlockedUsers from "./components/dashboard/premium/BlockedUsers.jsx";
import PremiumEvents from "./components/dashboard/premium/Events.jsx";
import PremiumSettings from "./components/dashboard/premium/Settings.jsx";
import PremiumFeedback from "./components/dashboard/premium/Feedback.jsx";
import PremiumProfileView from "./components/dashboard/premium/ProfileView.jsx";
import OrganizerDashboard from "./components/dashboard/organizer/OrganizerDashboard.jsx";
import AdminDashboard from "./components/dashboard/admin/AdminDashboard.jsx";

import "./styles/custom.css";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/upgrade" element={<UpgradePage />} />

      {/* Protected Dashboard Routes with Layout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["user", "organizer", "admin"]}>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Main Dashboard Route */}
        <Route index element={<DashboardRouter />} />

        {/* Free User Routes */}
        <Route path="free" element={<Outlet />}>
          <Route index element={<FreeUserDashboard />} />
          <Route path="manage-profile" element={<FreeManageProfile />} />
          <Route path="edit-profile" element={<FreeEditProfile />} />
          <Route path="manage-photos" element={<FreeManagePhotos />} />
          <Route path="search" element={<FreeSearchMatches />} />
          <Route path="proposals" element={<FreeProposals />} />
          <Route path="messages" element={<FreeMessages />} />
          <Route path="shortlist" element={<FreeShortlist />} />
          <Route path="blocked-users" element={<FreeBlockedUsers />} />
          <Route path="events" element={<FreeEvents />} />
          <Route path="settings" element={<FreeSettings />} />
          <Route path="feedback" element={<FreeFeedback />} />
          <Route path="profile/:id" element={<FreeProfileView />} />
        </Route>

        {/* Premium User Routes */}
        <Route path="premium" element={<Outlet />}>
          <Route index element={<PremiumUserDashboard />} />
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="manage-profile" element={<PremiumManageProfile />} />
          <Route path="edit-profile" element={<PremiumEditProfile />} />
          <Route path="manage-photos" element={<PremiumManagePhotos />} />
          <Route path="search" element={<PremiumSearchMatches />} />
          <Route path="proposals" element={<PremiumProposals />} />
          <Route path="messages" element={<PremiumMessages />} />
          <Route path="shortlist" element={<PremiumShortlist />} />
          <Route path="blocked-users" element={<PremiumBlockedUsers />} />
          <Route path="events" element={<PremiumEvents />} />
          <Route path="settings" element={<PremiumSettings />} />
          <Route path="feedback" element={<PremiumFeedback />} />
          <Route path="profile/:id" element={<PremiumProfileView />} />
        </Route>

        {/* Organizer & Admin Routes */}
        <Route path="organizer" element={<OrganizerDashboard />} />
        <Route path="admin" element={<AdminDashboard />} />

        {/* Legacy routes (keep old links working, but route under correct base) */}
        <Route
          path="search"
          element={<DashboardPathRouter subPath="search" />}
        />
        <Route
          path="proposals"
          element={<DashboardPathRouter subPath="proposals" />}
        />
        <Route
          path="messages"
          element={<DashboardPathRouter subPath="messages" />}
        />
        <Route
          path="shortlist"
          element={<DashboardPathRouter subPath="shortlist" />}
        />
        <Route
          path="events"
          element={<DashboardPathRouter subPath="events" />}
        />
        <Route
          path="settings"
          element={<DashboardPathRouter subPath="settings" />}
        />
        <Route
          path="edit-profile"
          element={<DashboardPathRouter subPath="edit-profile" />}
        />
        <Route
          path="manage-photos"
          element={<DashboardPathRouter subPath="manage-photos" />}
        />
        <Route
          path="manage-profile"
          element={<DashboardPathRouter subPath="manage-profile" />}
        />
        <Route
          path="blocked-users"
          element={<DashboardPathRouter subPath="blocked-users" />}
        />
        <Route
          path="feedback"
          element={<DashboardPathRouter subPath="feedback" />}
        />
        <Route
          path="profile/:id"
          element={<DashboardPathRouter subPath="profile/:id" />}
        />
        <Route
          path="my-profile"
          element={<DashboardPathRouter subPath="my-profile" />}
        />
      </Route>

      {/* Catch-all redirect */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
