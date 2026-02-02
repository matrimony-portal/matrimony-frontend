import { Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth.jsx";
import Loading from "../common/Loading.jsx";

const DashboardRouter = () => {
  const { userType, subscriptionStatus, subscriptionTier, loading } = useAuth();

  if (loading || (userType === "user" && subscriptionStatus === null)) {
    return <Loading message="Loading your dashboard..." />;
  }

  if (userType === "user") {
    // Premium only when explicitly premium tier; new users and FREE go to /dashboard/free
    const isPremium =
      subscriptionStatus === "active" && subscriptionTier === "premium";
    return isPremium ? (
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
