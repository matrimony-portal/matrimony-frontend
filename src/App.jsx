// src/App.jsx
import { Navigate, Outlet, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./providers/AuthProvider.jsx";

// Auth Components
import DashboardPathRouter from "./components/auth/DashboardPathRouter.jsx";
import DashboardRouter from "./components/auth/DashboardRouter.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";

// Public Pages
import HomePage from "./components/HomePage";
import UpgradePage from "./components/upgrade/UpgradePage.jsx";
import CompleteRegistrationPage from "./pages/auth/CompleteRegistrationPage.jsx";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage.jsx";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage.jsx";
import VerifyResetTokenPage from "./pages/auth/VerifyResetTokenPage.jsx";

// Layout
import Layout from "./components/common/Layout/Layout.jsx";

// Dashboard Pages (Free)
import FreeBlockedUsers from "./components/dashboard/free/BlockedUsers.jsx";
import FreeEditProfile from "./components/dashboard/free/EditProfile.jsx";
import FreeEvents from "./components/dashboard/free/Events.jsx";
import FreeFeedback from "./components/dashboard/free/Feedback.jsx";
import FreeUserDashboard from "./components/dashboard/free/FreeUserDashboard.jsx";
import FreeManagePhotos from "./components/dashboard/free/ManagePhotos.jsx";
import FreeManageProfile from "./components/dashboard/free/ManageProfile.jsx";
import FreeMessages from "./components/dashboard/free/Messages.jsx";
import FreeProfileView from "./components/dashboard/free/ProfileView.jsx";
import FreeProposals from "./components/dashboard/free/Proposals.jsx";
import FreeSearchMatches from "./components/dashboard/free/SearchMatches.jsx";
import FreeSettings from "./components/dashboard/free/Settings.jsx";
import FreeShortlist from "./components/dashboard/free/Shortlist.jsx";

// Dashboard Pages (Premium)
import AddEvent from "./components/dashboard/admin/AddEvent.jsx";
import AdminDashboard from "./components/dashboard/admin/AdminDashboard.jsx";
import AdminProfile from "./components/dashboard/admin/AdminProfile.jsx";
import BroadcastMessage from "./components/dashboard/admin/BroadcastMessage.jsx";
import GlobalAnnouncement from "./components/dashboard/admin/GlobalAnnouncement.jsx";
import ReportsCounter from "./components/dashboard/admin/ReportsCounter.jsx";
import OrganizerDashboard from "./components/dashboard/organizer/OrganizerDashboard.jsx";
import PremiumBlockedUsers from "./components/dashboard/premium/BlockedUsers.jsx";
import PremiumEditProfile from "./components/dashboard/premium/EditProfile.jsx";
import PremiumEvents from "./components/dashboard/premium/Events.jsx";
import PremiumFeedback from "./components/dashboard/premium/Feedback.jsx";
import PremiumManagePhotos from "./components/dashboard/premium/ManagePhotos.jsx";
import PremiumManageProfile from "./components/dashboard/premium/ManageProfile.jsx";
import PremiumMessages from "./components/dashboard/premium/Messages.jsx";
import MyProfile from "./components/dashboard/premium/MyProfile.jsx";
import PremiumUserDashboard from "./components/dashboard/premium/PremiumUserDashboard.jsx";
import PremiumProfileView from "./components/dashboard/premium/ProfileView.jsx";
import PremiumProposals from "./components/dashboard/premium/Proposals.jsx";
import PremiumSearchMatches from "./components/dashboard/premium/SearchMatches.jsx";
import PremiumSettings from "./components/dashboard/premium/Settings.jsx";
import PremiumShortlist from "./components/dashboard/premium/Shortlist.jsx";

import "react-toastify/dist/ReactToastify.css";
import "./styles/custom.css";

function App() {
  return (
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/register/verify" element={<VerifyEmailPage />} />
        <Route
          path="/register/complete"
          element={<CompleteRegistrationPage />}
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset/verify" element={<VerifyResetTokenPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
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
          <Route path="admin" element={<Outlet />}>
            <Route index element={<AdminDashboard />} />
            <Route path="profile" element={<AdminProfile />} />
            <Route path="broadcast" element={<BroadcastMessage />} />
            <Route path="add-event" element={<AddEvent />} />
            <Route path="announcement" element={<GlobalAnnouncement />} />
            <Route path="reports" element={<ReportsCounter />} />
          </Route>

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
    </AuthProvider>
  );
}

export default App;
