import { Navigate, useParams } from "react-router";
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
  const params = useParams();

  // Replace any :param occurrences in subPath with actual params
  const resolvedSubPath = subPath.replace(/:([A-Za-z0-9_]+)/g, (_, key) =>
    params[key] !== undefined ? params[key] : `:${key}`,
  );

  const to = resolvedSubPath ? `${base}/${resolvedSubPath}` : base;
  return <Navigate to={to} replace />;
}
