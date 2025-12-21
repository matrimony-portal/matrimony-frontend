import { Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth.jsx";
import Loading from "./Loading.jsx";

const DashboardRouter = () => {
  const { userType, subscriptionStatus, loading } = useAuth();

  // 🔴 THIS is the fix
  if (loading || (userType === "user" && subscriptionStatus === null)) {
    return <Loading message="Loading your dashboard..." />;
  }

  if (userType === "user") {
    return subscriptionStatus === "active" ? (
      <Navigate to="/dashboard/premium" replace />
    ) : (
      <Navigate to="/dashboard/free" replace />
    );
  }

  if (userType === "organizer") {
    return <Navigate to="/dashboard/organizer" replace />;
  }

  if (userType === "admin") {
    return <Navigate to="/dashboard/admin" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default DashboardRouter;
