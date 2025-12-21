import { useState, useEffect, useCallback } from "react";
import AuthContext from "../context/AuthContext.jsx";
import { authService } from "../services/index.js";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      try {
        const storedUser = localStorage.getItem("matrimony_user");
        const storedUserType = localStorage.getItem("matrimony_userType");

        if (storedUser && storedUserType) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setUserType(storedUserType);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
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

    localStorage.setItem("matrimony_token", data.token);
    localStorage.setItem("matrimony_user", JSON.stringify(userData));
    localStorage.setItem("matrimony_userType", data.user.userType);

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
      localStorage.removeItem("matrimony_token");
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
    loading,
    login,
    register,
    logout,
    isAuthenticated,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
