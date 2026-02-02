import { useMemo } from "react";
import { useAuth } from "./useAuth.jsx";

/**
 * Central place to describe what free vs premium (and other roles) can do.
 * Keeping limits here makes it easy to tweak product decisions.
 */
export function useUserCapabilities() {
  const { isPremiumUser, isFreeUser, userType } = useAuth();

  const premium = isPremiumUser();
  const free = isFreeUser();

  return useMemo(
    () => ({
      isPremium: premium,
      isFree: free,
      userType,
      // Messaging: premium and event organisers; free must upgrade
      canMessage: premium || userType === "organizer",
      // Advanced filters/search depth
      canUseAdvancedFilters: premium,
      // Daily proposal limits
      proposalDailyLimit: premium ? Infinity : 3,
      // Profile view limit per session/day (simple local check)
      profileViewLimit: premium ? Infinity : 10,
    }),
    [premium, free, userType],
  );
}
