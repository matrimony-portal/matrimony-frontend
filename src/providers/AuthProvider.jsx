import { useCallback, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext.jsx";
import { authService } from "../services/authService.js";
import { tokenManager } from "../utils/tokenManager.js";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem("matrimony_user");
        const refreshToken = tokenManager.getRefreshToken();

        if (storedUser && refreshToken) {
          try {
            const { data } = await authService.refreshToken(refreshToken);

            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setAccessToken(data.accessToken);
            tokenManager.setAccessToken(data.accessToken);
          } catch (error) {
            console.error("Token refresh failed:", error);
            tokenManager.clearTokens();
            localStorage.removeItem("matrimony_user");
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        tokenManager.clearTokens();
        localStorage.removeItem("matrimony_user");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await authService.login(email, password);

    setUser(data.user);
    setAccessToken(data.accessToken);
    tokenManager.setAccessToken(data.accessToken);
    tokenManager.setRefreshToken(data.refreshToken);

    localStorage.setItem("matrimony_user", JSON.stringify(data.user));
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setAccessToken(null);
      tokenManager.clearTokens();
      localStorage.removeItem("matrimony_user");
    }
  }, []);

  const isAuthenticated = useCallback(() => {
    return !!user;
  }, [user]);

  const hasRole = useCallback(
    (requiredRole) => {
      return user?.role === requiredRole;
    },
    [user],
  );

  const value = {
    user,
    accessToken,
    loading,
    login,
    logout,
    isAuthenticated,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
