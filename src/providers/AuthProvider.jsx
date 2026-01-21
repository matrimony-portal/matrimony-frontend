import { useState, useEffect, useCallback } from "react";
import AuthContext from "../context/AuthContext.jsx";
import { authService } from "../services/index.js";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  //Subscription based login
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [subscriptionTier, setSubscriptionTier] = useState(null);
  const [loading, setLoading] = useState(true);

  const normalizeSubscription = useCallback((rawUser) => {
    if (!rawUser) return { status: null, tier: null };

    const now = Date.now();
    const expiry = rawUser.subscriptionExpiry
      ? new Date(rawUser.subscriptionExpiry).getTime()
      : null;
    const isExpired = expiry && expiry < now;

    // If expired, treat as inactive/free
    if (isExpired) {
      return { status: "inactive", tier: "free" };
    }

    return {
      status: rawUser.subscriptionStatus ?? null,
      tier: rawUser.subscriptionTier ?? null,
    };
  }, []);

  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = localStorage.getItem("matrimony_user");
        const storedUserType = localStorage.getItem("matrimony_userType");
        const storedSubscriptionStatus = localStorage.getItem(
          "matrimony_subscriptionStatus",
        );
        const storedSubscriptionTier = localStorage.getItem(
          "matrimony_subscriptionTier",
        );

        if (storedUser && storedUserType) {
          const parsedUser = JSON.parse(storedUser);
          const normalized = normalizeSubscription({
            ...parsedUser,
            subscriptionStatus: storedSubscriptionStatus,
            subscriptionTier: storedSubscriptionTier,
          });

          setUser(parsedUser);
          setUserType(storedUserType);
          setSubscriptionStatus(normalized.status);
          setSubscriptionTier(normalized.tier);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        localStorage.removeItem("matrimony_user");
        localStorage.removeItem("matrimony_userType");
        localStorage.removeItem("matrimony_subscriptionStatus");
        localStorage.removeItem("matrimony_subscriptionTier");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, [normalizeSubscription]);

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password);

    const normalized = normalizeSubscription(data.user);

    const userData = {
      email: data.user.email,
      userType: data.user.userType,
      name: data.user.name,
      id: data.user.id,
      subscriptionStatus: normalized.status,
      subscriptionTier: normalized.tier,
      subscriptionExpiry: data.user.subscriptionExpiry,
    };

    setUser(userData);
    setUserType(data.user.userType);
    setSubscriptionStatus(normalized.status);
    setSubscriptionTier(normalized.tier);

    localStorage.setItem("matrimony_token", data.token);
    localStorage.setItem("matrimony_user", JSON.stringify(userData));
    localStorage.setItem("matrimony_userType", data.user.userType);
    localStorage.setItem("matrimony_subscriptionStatus", normalized.status);
    localStorage.setItem("matrimony_subscriptionTier", normalized.tier);

    return { success: true, user: userData };
  }, []);

  const register = useCallback(async (userData) => {
    const data = await authService.register(userData);
    return { success: true, user: data.user };
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setUserType(null);
      setSubscriptionStatus(null);
      setSubscriptionTier(null);
      localStorage.removeItem("matrimony_token");
      localStorage.removeItem("matrimony_user");
      localStorage.removeItem("matrimony_userType");
      localStorage.removeItem("matrimony_subscriptionStatus");
      localStorage.removeItem("matrimony_subscriptionTier");
    }
  }, []);

  const isAuthenticated = useCallback(() => {
    return !!user && !!userType;
  }, [user, userType]);

  const hasRole = useCallback(
    (role) => {
      return userType === role;
    },
    [userType],
  );

  // Helpers to determine user access levels based on subscription state
  const isPremiumUser = useCallback(() => {
    return (
      userType === "user" &&
      subscriptionStatus === "active" &&
      subscriptionTier === "premium"
    );
  }, [userType, subscriptionStatus, subscriptionTier]);

  const isFreeUser = useCallback(() => {
    return (
      userType === "user" &&
      (subscriptionStatus === "inactive" || subscriptionTier === "free")
    );
  }, [userType, subscriptionStatus, subscriptionTier]);

  const value = {
    user,
    userType,
    subscriptionStatus,
    subscriptionTier,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    hasRole,
    isPremiumUser,
    isFreeUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
