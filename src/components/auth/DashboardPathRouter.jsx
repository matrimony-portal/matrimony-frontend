import { Navigate } from "react-router";
import { useDashboardBasePath } from "../../hooks/useDashboardBasePath.jsx";

/**
 * Redirects legacy /dashboard/<subPath> routes to the correct grouped route:
 * - /dashboard/free/<subPath>
 * - /dashboard/premium/<subPath>
 * - /dashboard/admin (ignores subPath if you choose)
 * - /dashboard/organizer (ignores subPath if you choose)
 */
export default function DashboardPathRouter({ subPath = "" }) {
  const base = useDashboardBasePath();
  const to = subPath ? `${base}/${subPath}` : base;
  return <Navigate to={to} replace />;
}
