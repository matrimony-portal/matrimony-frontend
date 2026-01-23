import { useMemo } from "react";
import { useAuth } from "./useAuth.jsx";

/**
 * Returns the correct dashboard "base path" for the logged-in user.
 * Examples:
 * - /dashboard/free
 * - /dashboard/premium
 * - /dashboard/organizer
 * - /dashboard/admin
 */
export function useDashboardBasePath() {
  const { userType, subscriptionStatus, subscriptionTier } = useAuth();

  return useMemo(() => {
    if (userType === "admin") return "/dashboard/admin";
    if (userType === "organizer") return "/dashboard/organizer";

    // Regular user: decide free vs premium
    const isPremium =
      subscriptionStatus === "active" && subscriptionTier === "premium";
    return isPremium ? "/dashboard/premium" : "/dashboard/free";
  }, [userType, subscriptionStatus, subscriptionTier]);
}
