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

// Dashboard Pages - Free
import FreeUserDashboard from "./components/dashboard/free/FreeUserDashboard.jsx";

// Dashboard Pages - Premium User
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

// Dashboard Pages - Organizer
import OrganizerDashboard from "./components/dashboard/organizer/OrganizerDashboard.jsx";
import OrganizerEvents from "./components/dashboard/organizer/OrganizerEvents.jsx";
import CreateEvent from "./components/dashboard/organizer/CreateEvent.jsx";
import OrganizerProfilePage from "./components/dashboard/organizer/OrganizerProfilePage.jsx";
import OrganizerSettings from "./components/dashboard/organizer/OrganizerSettings.jsx";

// Dashboard Pages - Admin
import AdminDashboard from "./components/dashboard/admin/AdminDashboard.jsx";
import ManageUsers from "./components/dashboard/admin/ManageUsers.jsx";
import ManageOrganizers from "./components/dashboard/admin/ManageOrganizers.jsx";
import AddOrganizer from "./components/dashboard/admin/AddOrganizer.jsx";
import ManageSuccessStories from "./components/dashboard/admin/ManageSuccessStories.jsx";
import ReportsComplaints from "./components/dashboard/admin/ReportsComplaints.jsx";
import AddSuccessStory from "./components/dashboard/admin/AddSuccessStory.jsx";
import EditOrganizer from "./components/dashboard/admin/EditOrganizer.jsx";
import EditSuccessStory from "./components/dashboard/admin/EditSuccessStory.jsx";
import OrganizerProfile from "./components/dashboard/admin/OrganizerProfile.jsx";

import "./styles/custom.css";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

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

          {/* Organizer Routes - Protected */}
          <Route
            path="organizer"
            element={
              <ProtectedRoute allowedRoles={["organizer"]}>
                <OrganizerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="organizer/events"
            element={
              <ProtectedRoute allowedRoles={["organizer"]}>
                <OrganizerEvents />
              </ProtectedRoute>
            }
          />
          <Route
            path="organizer/create-event"
            element={
              <ProtectedRoute allowedRoles={["organizer"]}>
                <CreateEvent />
              </ProtectedRoute>
            }
          />
          <Route
            path="organizer/profile"
            element={
              <ProtectedRoute allowedRoles={["organizer"]}>
                <OrganizerProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="organizer/settings"
            element={
              <ProtectedRoute allowedRoles={["organizer"]}>
                <OrganizerSettings />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes - Protected */}
          <Route
            path="admin"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/manage-users"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageUsers />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/manage-organizers"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageOrganizers />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/add-organizer"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddOrganizer />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/manage-success-stories"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ManageSuccessStories />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/reports-complaints"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <ReportsComplaints />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/add-success-story"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <AddSuccessStory />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/edit-organizer/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EditOrganizer />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/edit-success-story/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <EditSuccessStory />
              </ProtectedRoute>
            }
          />
          <Route
            path="admin/organizer-profile/:id"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <OrganizerProfile />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
