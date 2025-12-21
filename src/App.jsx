import { Navigate, Route, Routes, BrowserRouter } from "react-router";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import DashboardRouter from "./components/auth/DashboardRouter.jsx";

// Auth Pages
import HomePage from "./components/HomePage";
import Login from "./components/auth/Login.jsx";
import Register from "./components/auth/Register.jsx";
import ForgotPassword from "./components/ForgotPassword";

// Dashboard Pages
import OrganizerDashboard from "./components/OrganizerDashboard";
import AdminDashboard from "./components/AdminDashboard";
import FreeUserDashboard from "./components/dashboard/free/FreeUserDashboard.jsx";
import PremiumUserDashboard from "./components/dashboard/premium/PremiumUserDashboard.jsx";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Dashboard Router - Redirects based on user type */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardRouter />
          </ProtectedRoute>
        }
      />

      {/* Free User Dashboard */}
      <Route
        path="/dashboard/free"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <FreeUserDashboard />
          </ProtectedRoute>
        }
      />

      {/* Premium User Dashboard */}
      <Route
        path="/dashboard/premium"
        element={
          <ProtectedRoute allowedRoles={["user"]}>
            <PremiumUserDashboard />
          </ProtectedRoute>
        }
      />

      {/* Organizer Dashboard */}
      <Route
        path="/dashboard/organizer"
        element={
          <ProtectedRoute allowedRoles={["organizer"]}>
            <OrganizerDashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Dashboard */}
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Catch all - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
