import { Navigate } from "react-router";
import { useAuth } from "../../hooks/useAuth.jsx";
import Loading from "../common/Loading.jsx";

const DashboardRouter = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loading message="Loading your dashboard..." />;
  }

  if (user?.role === "USER") {
    return <Navigate to="/dashboard/free" replace />;
  }

  if (user?.role === "ORGANIZER") {
    return <Navigate to="/dashboard/organizer" replace />;
  }

  if (user?.role === "ADMIN") {
    return <Navigate to="/dashboard/admin" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default DashboardRouter;
