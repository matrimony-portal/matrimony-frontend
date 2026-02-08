import { useCallback, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext.jsx";
import { authService } from "../services/authService.js";
import { tokenManager } from "../utils/tokenManager.js";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem("matrimony_user");
        const storedUserType = localStorage.getItem("matrimony_userType");
        const refreshToken = tokenManager.getRefreshToken();

        if (storedUser && storedUserType && refreshToken) {
          try {
            const { data } = await authService.refreshToken(refreshToken);

            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setUserType(storedUserType);
            setAccessToken(data.accessToken);
            tokenManager.setAccessToken(data.accessToken);
          } catch (error) {
            console.error("Token refresh failed:", error);
            tokenManager.clearTokens();
            localStorage.removeItem("matrimony_user");
            localStorage.removeItem("matrimony_userType");
          }
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        tokenManager.clearTokens();
        localStorage.removeItem("matrimony_user");
        localStorage.removeItem("matrimony_userType");
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await authService.login(email, password);

    const userData = {
      email: data.user.email,
      userType: data.user.userType,
      name: data.user.name,
      id: data.user.id,
    };

    setUser(userData);
    setUserType(data.user.userType);
    setAccessToken(data.accessToken);
    tokenManager.setAccessToken(data.accessToken);
    tokenManager.setRefreshToken(data.refreshToken);

    localStorage.setItem("matrimony_user", JSON.stringify(userData));
    localStorage.setItem("matrimony_userType", data.user.userType);

    return { success: true, user: userData };
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setUserType(null);
      setAccessToken(null);
      tokenManager.clearTokens();
      localStorage.removeItem("matrimony_user");
      localStorage.removeItem("matrimony_userType");
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

  const value = {
    user,
    userType,
    accessToken,
    loading,
    login,
    logout,
    isAuthenticated,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
