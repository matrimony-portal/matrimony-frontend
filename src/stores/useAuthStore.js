import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { authService } from "../services/index.js";

/**
 * Auth Store using Zustand
 * Manages authentication state globally
 * Replaces Context API for better performance and simplicity
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      accessToken: null,
      userType: null,
      subscriptionStatus: null,
      subscriptionTier: null,
      loading: false,
      error: null,

      // Normalize subscription status
      normalizeSubscription: (rawUser) => {
        if (!rawUser) return { status: null, tier: null };

        const now = Date.now();
        const expiry = rawUser.subscriptionExpiry
          ? new Date(rawUser.subscriptionExpiry).getTime()
          : null;
        const isExpired = expiry && expiry < now;

        if (isExpired) {
          return { status: "inactive", tier: "free" };
        }

        return {
          status: rawUser.subscriptionStatus ?? null,
          tier: rawUser.subscriptionTier ?? null,
        };
      },

      // Actions
      login: async (email, password, userType) => {
        set({ loading: true, error: null });
        try {
          const data = await authService.login(email, password, userType);
          const normalized = get().normalizeSubscription(data.user);

          const userData = {
            email: data.user.email,
            userType: data.user.userType,
            name: data.user.name,
            id: data.user.id,
            subscriptionStatus: normalized.status,
            subscriptionTier: normalized.tier,
            subscriptionExpiry: data.user.subscriptionExpiry,
          };

          set({
            user: userData,
            accessToken: data.token,
            userType: data.user.userType,
            subscriptionStatus: normalized.status,
            subscriptionTier: normalized.tier,
            loading: false,
            error: null,
          });

          // Store token in localStorage for axios interceptors
          localStorage.setItem("matrimony_token", data.token);
          localStorage.setItem("matrimony_user", JSON.stringify(userData));
          localStorage.setItem("matrimony_userType", data.user.userType);
          localStorage.setItem(
            "matrimony_subscriptionStatus",
            normalized.status,
          );
          localStorage.setItem("matrimony_subscriptionTier", normalized.tier);

          return { success: true, user: userData };
        } catch (error) {
          const errorMessage =
            error.response?.data?.message || error.message || "Login failed";
          set({ loading: false, error: errorMessage });
          throw error;
        }
      },

      register: async (userData) => {
        set({ loading: true, error: null });
        try {
          const data = await authService.register(userData);
          set({ loading: false, error: null });
          return { success: true, user: data.user };
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Registration failed";
          set({ loading: false, error: errorMessage });
          throw error;
        }
      },

      logout: async () => {
        set({ loading: true });
        try {
          await authService.logout();
        } catch (error) {
          console.error("Logout error:", error);
        } finally {
          set({
            user: null,
            accessToken: null,
            userType: null,
            subscriptionStatus: null,
            subscriptionTier: null,
            loading: false,
            error: null,
          });

          // Clear localStorage
          localStorage.removeItem("matrimony_token");
          localStorage.removeItem("matrimony_user");
          localStorage.removeItem("matrimony_userType");
          localStorage.removeItem("matrimony_subscriptionStatus");
          localStorage.removeItem("matrimony_subscriptionTier");
        }
      },

      updateUser: (userData) => {
        set((state) => ({
          user: { ...state.user, ...userData },
        }));
        // Sync with localStorage
        const updatedUser = { ...get().user, ...userData };
        localStorage.setItem("matrimony_user", JSON.stringify(updatedUser));
      },

      // Computed/derived state (selectors)
      isAuthenticated: () => {
        return !!get().user && !!get().userType;
      },

      hasRole: (role) => {
        return get().userType === role;
      },

      isPremiumUser: () => {
        const state = get();
        return (
          state.userType === "user" &&
          state.subscriptionStatus === "active" &&
          state.subscriptionTier === "premium"
        );
      },

      isFreeUser: () => {
        const state = get();
        return (
          state.userType === "user" &&
          (state.subscriptionStatus === "inactive" ||
            state.subscriptionTier === "free")
        );
      },

      isAdmin: () => {
        return get().userType === "admin";
      },

      isOrganizer: () => {
        return get().userType === "organizer";
      },

      // Initialize from localStorage on mount
      initialize: () => {
        try {
          const storedUser = localStorage.getItem("matrimony_user");
          const storedUserType = localStorage.getItem("matrimony_userType");
          const storedToken = localStorage.getItem("matrimony_token");
          const storedSubscriptionStatus = localStorage.getItem(
            "matrimony_subscriptionStatus",
          );
          const storedSubscriptionTier = localStorage.getItem(
            "matrimony_subscriptionTier",
          );

          if (storedUser && storedUserType && storedToken) {
            const parsedUser = JSON.parse(storedUser);
            const normalized = get().normalizeSubscription({
              ...parsedUser,
              subscriptionStatus: storedSubscriptionStatus,
              subscriptionTier: storedSubscriptionTier,
            });

            set({
              user: parsedUser,
              accessToken: storedToken,
              userType: storedUserType,
              subscriptionStatus: normalized.status,
              subscriptionTier: normalized.tier,
            });
          }
        } catch (error) {
          console.error("Error initializing auth:", error);
          get().logout();
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage for security
      partialize: (state) => ({
        // Only persist user data, not token (token in localStorage for axios)
        user: state.user,
        userType: state.userType,
        subscriptionStatus: state.subscriptionStatus,
        subscriptionTier: state.subscriptionTier,
      }),
    },
  ),
);

// Initialize on module load
if (typeof window !== "undefined") {
  useAuthStore.getState().initialize();
}
