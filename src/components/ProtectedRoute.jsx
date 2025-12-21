import { useAuth } from "../hooks/useAuth.jsx";
import { Navigate, useLocation } from "react-router";
import Loading from "./Loading.jsx";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, userType, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (!user || !userType) {
    // Redirect to login page with return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(userType)) {
    // User doesn't have required role
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
