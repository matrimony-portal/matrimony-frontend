// src/App.jsx
import { Routes, Route, Navigate, Outlet } from "react-router";
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
import PaymentPage from "./components/common/Subscription.jsx";
import ContactPage from "./components/common/Contact.jsx";
import PublicLayout from "./components/common/Layout/PublicLayout.jsx";

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

// Dashboard Pages - Admin
import AdminDashboard from "./components/dashboard/admin/AdminDashboard.jsx";

// Dashboard Pages - Organizer
import { EventOrganizerDashboard } from "./components/dashboard/organizer/OrganizerDashboard.jsx";
import { OrganizerProfile } from "./components/dashboard/organizer/OrganizerProfile.jsx";
import { EditOrganizerProfile } from "./components/dashboard/organizer/EditOrganizer.jsx";
import { OrganizerSettings } from "./components/dashboard/organizer/OrganizerSettings.jsx";
import { EventForm } from "./components/dashboard/organizer/EventForm.jsx";
import { EventDetails } from "./components/dashboard/organizer/EventDetails.jsx";
import { EventRequests } from "./components/dashboard/organizer/EventRequests.jsx";
import { MyEventsList } from "./components/dashboard/organizer/MyEventsList.jsx";
import { ViewEventParticipantProfile } from "./components/dashboard/organizer/ViewEventParticipantProfile.jsx";
import { OverallEventsList } from "./components/dashboard/organizer/EventList.jsx";
import { BlockedUsers as OrganizerBlockedUsers } from "./components/dashboard/organizer/BlockedUsers.jsx";
import OrganizerMessages from "./components/dashboard/organizer/Messages.jsx";

// Shared Components
import PartnerPreferences from "./components/dashboard/shared/PartnerPreferences.jsx";
import OrganizerFeedback from "./components/dashboard/shared/Feedback.jsx";
import { ViewEventOrganizerProfile } from "./components/common/ViewEventOrganizerProfile.jsx";

import "./styles/custom.css";

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/upgrade" element={<UpgradePage />} />

        {/* Public Routes with Navbar Layout */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/subscription" element={<PaymentPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Route>

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
            <Route path="my-profile" element={<MyProfile />} />
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
            <Route
              path="partner-preferences"
              element={<PartnerPreferences />}
            />
            <Route
              path="organizer-profile/:organizerId"
              element={<ViewEventOrganizerProfile />}
            />
            <Route path="subscription" element={<PaymentPage />} />
            <Route path="contact" element={<ContactPage />} />
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
            <Route
              path="partner-preferences"
              element={<PartnerPreferences />}
            />
            <Route
              path="organizer-profile/:organizerId"
              element={<ViewEventOrganizerProfile />}
            />
            <Route path="subscription" element={<PaymentPage />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          {/* Event Organizer Routes */}
          <Route path="organizer" element={<Outlet />}>
            <Route index element={<EventOrganizerDashboard />} />
            <Route path="my-profile" element={<OrganizerProfile />} />
            <Route path="edit-profile" element={<EditOrganizerProfile />} />
            <Route path="my-events" element={<MyEventsList />} />
            <Route path="events" element={<OverallEventsList />} />
            <Route path="create-event" element={<EventForm />} />
            <Route path="event-requests" element={<EventRequests />} />
            <Route
              path="event-view/:eventId"
              element={<EventDetails mode="view" />}
            />
            <Route path="event-edit/:eventId" element={<EventForm />} />
            <Route
              path="organizer-profile/:organizerId"
              element={<ViewEventOrganizerProfile />}
            />
            <Route
              path="participant-profile/:registrationId"
              element={<ViewEventParticipantProfile />}
            />
            <Route path="settings" element={<OrganizerSettings />} />
            <Route path="blocked-users" element={<OrganizerBlockedUsers />} />
            <Route path="messages" element={<OrganizerMessages />} />
            <Route path="feedback" element={<OrganizerFeedback />} />
            <Route path="contact" element={<ContactPage />} />
          </Route>

          {/* Admin Routes */}
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
          <Route
            path="partner-preferences"
            element={<DashboardPathRouter subPath="partner-preferences" />}
          />
          <Route
            path="subscription"
            element={<DashboardPathRouter subPath="subscription" />}
          />
          <Route
            path="contact"
            element={<DashboardPathRouter subPath="contact" />}
          />
        </Route>

        {/* Catch-all redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
